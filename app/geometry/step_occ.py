"""STEP feature extraction with OpenCascade (OCP bindings, the same kernel pythonOCC wraps).
Reads the B-rep, walks every face, classifies cylindrical faces by radius and axis, and measures the bounding box."""
from __future__ import annotations
import math
from collections import defaultdict

def available() -> bool:
    import importlib.util
    return importlib.util.find_spec("OCP") is not None

def parse(path: str) -> dict:
    from OCP.STEPControl import STEPControl_Reader
    from OCP.IFSelect import IFSelect_RetDone
    from OCP.TopExp import TopExp_Explorer
    from OCP.TopAbs import TopAbs_FACE
    import OCP.TopoDS as _TopoDS
    from OCP.BRepAdaptor import BRepAdaptor_Surface
    from OCP.GeomAbs import GeomAbs_Cylinder, GeomAbs_Cone, GeomAbs_Torus, GeomAbs_Plane
    from OCP.Bnd import Bnd_Box
    from OCP.BRepBndLib import BRepBndLib
    from OCP.GProp import GProp_GProps
    from OCP.BRepGProp import BRepGProp
    reader = STEPControl_Reader()
    if reader.ReadFile(str(path)) != IFSelect_RetDone:
        raise ValueError("OpenCascade could not read this STEP file")
    reader.TransferRoots()
    shape = reader.OneShape()
    groups = defaultdict(lambda: {"faces": 0, "surfaces": 0, "axes": []})
    planes = cones = tori = 0
    exp = TopExp_Explorer(shape, TopAbs_FACE)
    while exp.More():
        face = _to_face(_TopoDS, exp.Current()); ad = BRepAdaptor_Surface(face, True); t = ad.GetType()
        if t == GeomAbs_Cylinder:
            cyl = ad.Cylinder(); r = cyl.Radius(); ax = cyl.Axis(); loc = ax.Location(); d = ax.Direction()
            key = round(r * 2, 2)
            g = groups[key]; g["faces"] += 1
            axis = (round(loc.X(), 2), round(loc.Y(), 2), round(loc.Z(), 2), round(d.X(), 3), round(d.Y(), 3), round(d.Z(), 3))
            # two half-faces of one hole share an axis: count distinct axes as distinct cylinders
            if not any(_same_axis(axis, a) for a in g["axes"]): g["axes"].append(axis); g["surfaces"] += 1
        elif t == GeomAbs_Plane: planes += 1
        elif t == GeomAbs_Cone: cones += 1
        elif t == GeomAbs_Torus: tori += 1
        exp.Next()
    box = Bnd_Box(); BRepBndLib.Add_s(shape, box, True)
    cmin, cmax = box.CornerMin(), box.CornerMax()
    xmin, ymin, zmin, xmax, ymax, zmax = cmin.X(), cmin.Y(), cmin.Z(), cmax.X(), cmax.Y(), cmax.Z()
    props = GProp_GProps(); BRepGProp.VolumeProperties_s(shape, props)
    cylinders = [{"diameter": d, "radius": round(d / 2, 3), "surfaces": g["surfaces"], "faces": g["faces"], "axes": [list(a[:3]) for a in g["axes"]]} for d, g in sorted(groups.items())]
    return {"file": str(path), "product": _product_name(path), "units": "mm", "engine": "opencascade", "cylinders": cylinders, "cylinder_count": sum(c["surfaces"] for c in cylinders),
            "extents": {"x": round(xmax - xmin, 3), "y": round(ymax - ymin, 3), "z": round(zmax - zmin, 3)}, "faces": {"planes": planes, "cones": cones, "tori": tori},
            "volume_mm3": round(props.Mass(), 2), "schema": None}

def _to_face(mod, shape):
    """Downcast a TopoDS_Shape to TopoDS_Face across OCP versions (static Face_s on the TopoDS class, or the module-level function)."""
    cls = getattr(mod, "TopoDS", None)
    for cand in ((getattr(cls, "Face_s", None) if cls else None), (getattr(cls, "Face", None) if cls else None), getattr(mod, "Face_s", None), getattr(mod, "topods_Face", None)):
        if cand:
            try: return cand(shape)
            except TypeError: continue
    from OCP.TopoDS import TopoDS_Face
    return TopoDS_Face(shape)

def _same_axis(a, b, tol=0.05):
    if abs(abs(a[3] * b[3] + a[4] * b[4] + a[5] * b[5]) - 1) > 1e-3: return False
    # distance between axis points projected perpendicular to the direction
    dx, dy, dz = a[0] - b[0], a[1] - b[1], a[2] - b[2]
    dot = dx * a[3] + dy * a[4] + dz * a[5]
    px, py, pz = dx - dot * a[3], dy - dot * a[4], dz - dot * a[5]
    return math.sqrt(px * px + py * py + pz * pz) < tol

def _product_name(path):
    import re
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as fh: head = fh.read(200000)
        m = re.search(r"PRODUCT\s*\(\s*'([^']*)'", head)
        return m.group(1) if m else None
    except Exception:
        return None
