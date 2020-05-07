class Collision {
    static checkCollide(obj1, obj2) {
        var distX = Math.abs(objt1.x - objt2.x);
        var distY = Math.abs(objt1.y - objt2.y);

        if (distX < obj1.width/2) {
            if (distY<objt1.height/2) {
                return true;
            }
        }
        return false;
    }
}