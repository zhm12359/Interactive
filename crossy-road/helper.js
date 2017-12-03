function isPointInsideRect(x, y, z1, z2, z3, z4) {
    x1 = Math.min(z1, z3);
    x2 = Math.max(z1, z3);
    y1 = Math.min(z2, z4);
    y2 = Math.max(z2, z4);
    return ((x1 <= x ) && ( x <= x2) && (y1 <= y) && (y <= y2))
}