"""Tessellation of a STEP body for the 3D viewer: triangles grouped per face with the face's surface type and cylinder diameter,
so the front end can colour the features that disagree with the drawing."""
from __future__ import annotations
import logging
from . import step_occ

log = logging.getLogger("printverity.mesh")

def tessellate(path: str, deflection: float = 0.15) -> dict:
    if not step_occ.available():
        raise RuntimeError("3D preview needs the OpenCascade engine")
    from OCP.STEPControl import STEPControl_Reader
    from OCP.IFSelect import IFSelect_RetDone
    from OCP.BRepMesh import BRepMesh_IncrementalMesh
    from OCP.TopExp import TopExp_Explorer
    from OCP.TopAbs import TopAbs_FACE, TopAbs_REVERSED
    from OCP.BRep import BRep_Tool
    from OCP.TopLoc import TopLoc_Location
    from OCP.BRepAdaptor import BRepAdaptor_Surface
    from OCP.GeomAbs import GeomAbs_Cylinder, GeomAbs_Plane, GeomAbs_Cone, GeomAbs_Torus, GeomAbs_Sphere
    import OCP.TopoDS as _TopoDS
    reader = STEPControl_Reader()
    if reader.ReadFile(str(path)) != IFSelect_RetDone:
        raise ValueError("OpenCascade could not read this STEP file")
    reader.TransferRoots(); shape = reader.OneShape()
    BRepMesh_IncrementalMesh(shape, deflection, False, 0.3, True)
    verts: list[list[float]] = []; faces: list[dict] = []
    exp = TopExp_Explorer(shape, TopAbs_FACE)
    while exp.More():
        face = step_occ._to_face(_TopoDS, exp.Current())
        loc = TopLoc_Location(); tri = BRep_Tool.Triangulation_s(face, loc)
        if tri is not None:
            ad = BRepAdaptor_Surface(face, True); t = ad.GetType()
            kind = {GeomAbs_Cylinder: "cylinder", GeomAbs_Plane: "plane", GeomAbs_Cone: "cone", GeomAbs_Torus: "torus", GeomAbs_Sphere: "sphere"}.get(t, "other")
            dia = round(ad.Cylinder().Radius() * 2, 2) if t == GeomAbs_Cylinder else None
            trsf = loc.Transformation(); base = len(verts)
            n = tri.NbNodes()
            for i in range(1, n + 1):
                p = tri.Node(i).Transformed(trsf); verts.append([round(p.X(), 3), round(p.Y(), 3), round(p.Z(), 3)])
            tris = []
            reversed_ = face.Orientation() == TopAbs_REVERSED
            for i in range(1, tri.NbTriangles() + 1):
                a, b, c = tri.Triangle(i).Get()
                tris.append([base + a - 1, base + c - 1, base + b - 1] if reversed_ else [base + a - 1, base + b - 1, base + c - 1])
            faces.append({"kind": kind, "diameter": dia, "tris": tris})
        exp.Next()
    xs = [v[0] for v in verts]; ys = [v[1] for v in verts]; zs = [v[2] for v in verts]
    bbox = [[min(xs), min(ys), min(zs)], [max(xs), max(ys), max(zs)]] if verts else [[0, 0, 0], [0, 0, 0]]
    return {"vertices": verts, "faces": faces, "bbox": bbox, "triangles": sum(len(f["tris"]) for f in faces)}
