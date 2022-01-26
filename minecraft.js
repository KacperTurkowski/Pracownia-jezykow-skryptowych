player.onChat("start", function () {
    MakeFlor()
    MakeMoat()
    MakeWalls()
    MakeBridge()
    MakeFirstFlor();
    MakeTower(startX)
    MakeTower(startX+39-5)
    MakeWell()
    MakeGate()
    player.say("end")
})

function MakeGate(){
    blocks.place(REDSTONE, pos((standardW/2)-3+startX, 0, 1))
    blocks.place(REDSTONE, pos((standardW/2)+2+startX, 0, 1))
    blocks.place(REDSTONE, pos((standardW/2)-3+startX, 0, 2))
    blocks.place(REDSTONE, pos((standardW/2)+2+startX, 0, 2))

    blocks.place(REDSTONE, pos((standardW/2)-2+startX, 0, 2))
    blocks.place(REDSTONE, pos((standardW/2)-1+startX, 0, 2))
    blocks.place(REDSTONE, pos((standardW/2)+startX, 0, 2))
    blocks.place(REDSTONE, pos((standardW/2)+1+startX, 0, 2))
    blocks.place(REDSTONE, pos((standardW/2)-3+startX, 0, 2))
    blocks.place(REDSTONE, pos((standardW/2)+2+startX, 0, 2))
    blocks.place(REDSTONE, pos((standardW/2)-4+startX, 0, 1))
    blocks.place(REDSTONE, pos((standardW/2)+3+startX, 0, 1))

    blocks.place(REDSTONE, pos((standardW/2)+3+startX, 1, 0))
    blocks.place(REDSTONE, pos((standardW/2)-4+startX, 1, 0))

    blocks.place(REDSTONE, pos((standardW/2)+2+startX, 2, 0))
    blocks.place(REDSTONE, pos((standardW/2)-3+startX, 2, 0))
    blocks.place(REDSTONE, pos((standardW/2)+1+startX, 3, 0))
    blocks.place(REDSTONE, pos((standardW/2)-2+startX, 3, 0))

    blocks.place(STICKY_PISTON, pos((standardW/2)-1+startX, 3, 0))
    blocks.place(STICKY_PISTON, pos((standardW/2)+startX, 3, 0))

    blocks.place(AIR,pos((standardW/2)-1+startX, 0, 0) )
    blocks.place(AIR,pos((standardW/2)+startX, 0, 0) )
    blocks.place(AIR,pos((standardW/2)-1+startX, 1, 0) )
    blocks.place(AIR,pos((standardW/2)+startX, 1, 0) )

    blocks.place(GLASS,pos((standardW/2)-3+startX, 3, 0) )
    blocks.place(GLASS,pos((standardW/2)+2+startX, 3, 0) )

    blocks.place(LEVER, pos((standardW/2)+1+startX, 0, 3))

    blocks.place(IRON_BARS, pos((standardW/2)+0+startX, 2, 0))
    blocks.place(IRON_BARS, pos((standardW/2)-1+startX, 2, 0))

    
}

function MakeColumn (x: number, z:number, maxH: number) {
    for (let y2 = 0; y2 <= maxH; y2++) {
        shapes.line(STONE_BRICKS, pos(x, y2, z), pos(x, y2, z))
    }
}

function MakeColumnWithGlass (x: number, z:number, maxH: number) {
    for (let y = 0; y <= 9; y++) {
        if (y % 3 == 2) {
            shapes.line(GLASS,pos(x, y, z),pos(x, y, z))
        } else {
            shapes.line(STONE_BRICKS,pos(x, y, z),pos(x, y, z))
        }
    }
}

function MakeBridge(){
    for(let x = (standardW/2)-3+startX; x <= (standardW/2)+2+startX; x++){
        shapes.line(LOG_DARK_OAK, pos(x, -1, -1), pos(x, -1, -6))
    }
    shapes.line(OAK_WOOD_SLAB, pos((standardW/2)-3+startX, 0, -1), pos((standardW/2)-3+startX, 0, -6))
    shapes.line(OAK_WOOD_SLAB, pos((standardW/2)+2+startX, 0, -1), pos((standardW/2)+2+startX, 0, -6))

    blocks.place(CAMPFIRE, pos((standardW/2)-3+startX, 0, -7))
    blocks.place(CAMPFIRE, pos((standardW/2)+2+startX, 0, -7))
}

function MakeWalls () {
    
    for (let x = startX; x <= standardW+startX; x++) {
        if (x == startX+14 || x ==startX+15 || x==startX+16 || x == startX+25 || x == startX+24 || x == startX+23) {
            MakeColumnWithGlass(x, 0, standardH)     
            MakeColumnWithGlass(x, standardW, standardH)       
        } else {
            MakeColumn(x, 0, standardH)
            MakeColumn(x, standardW, standardH)
        }
    }

    for (let z = 0; z <= standardW; z++) {
        if (z == 13 || z == 14 || z ==15 || z==23 || z==24 || z==25)
        {
            MakeColumnWithGlass(startX, z, standardH)
            MakeColumnWithGlass(standardW+startX, z, standardH)
        } else {
            MakeColumn(startX, z, standardH)
            MakeColumn(standardW+startX, z, standardH)
        }
    }
    
    shapes.line(LADDER, pos(startX+4, 0, standardW+1), pos(startX+4, 14, standardW+1))

}

function MakeMoat(){
    for(let y = -1;y>=-4;y--){
        for (let x = startX-1; x <= standardW+startX + 6; x++) {
            shapes.line(WATER, pos(x, y, -2), pos(x, y, -6)) 
        }
    
        for (let z = -1; z <= standardW + 6; z++) {
            shapes.line(WATER, pos(standardW+2+startX, y, z), pos(standardW+6+startX, y, z))
        }

        for (let x = startX-6; x <= standardW+startX+1; x++) {
            shapes.line(WATER, pos(x, y, standardW+2), pos(x, y, standardW+6))
        }

        for (let z = -6; z <= standardW+1; z++) {
            shapes.line(WATER, pos(-2 +startX, y, z), pos(-6 +startX, y, z))
        }
    }
}

function MakeTower(startX: number){
    for(let y = 0;y<15;y++){
        shapes.line(STONE_BRICKS, pos(startX, y, 0), pos(startX+5, y, 0))
        shapes.line(STONE_BRICKS, pos(startX, y, 5), pos(startX+5, y, 5))
        shapes.line(STONE_BRICKS, pos(startX, y, 0), pos(startX, y, 5))
        shapes.line(STONE_BRICKS, pos(startX+5, y, 0), pos(startX+5, y, 5))
    }
    blocks.place(IRON_DOOR, pos(startX+4, 0, 5))
    
    for(let x=startX+1;x<startX+5;x++){
        shapes.line(DARK_OAK_WOOD_SLAB, pos(x, 14, 1), pos(x, 14, 4))
    }

    blocks.place(STONE_BRICKS, pos(startX, 15, 0))
    blocks.place(STONE_BRICKS, pos(startX+5, 15, 0))

    blocks.place(STONE_BRICKS, pos(startX, 15, 5))
    blocks.place(STONE_BRICKS, pos(startX+5, 15, 5))

    blocks.place(AIR, pos(startX+4, 14, 1))
    shapes.line(LADDER, pos(startX+4, 0, 1), pos(startX+4, 14, 1))
    
    blocks.place(CAMPFIRE, pos(startX+1, 14, 1))
}

function MakeFirstFlor(){
    for(let z = 1; z<=7; z++){
        shapes.line(STONE_BRICKS, pos(startX+6, 9, z), pos(standardW+startX-5, 9, z))
        shapes.line(STONE_BRICKS, pos(startX+1, 9, standardW-z), pos(standardW+startX-1, 9, standardW-z))
    }
    for(let x = 1; x<=7; x++){
        shapes.line(STONE_BRICKS, pos(startX+x, 9, 6), pos(startX+x, 9, standardW))
        shapes.line(STONE_BRICKS, pos(standardW+startX-x, 9, 6), pos(standardW+startX-x, 9, standardW))
    }
    for(let z = 18;z <=22; z++){
        shapes.line(STONE_BRICK_STAIRS, pos(startX+standardW-9-7, 0, z), pos(startX+standardW-7, 9, z))
    }
    
}

function MakeWell(){
    shapes.line(STONE_BRICKS, pos((standardW/2)-2+startX, 0, (standardW/2)+4), pos((standardW/2)-2+startX, 0, (standardW/2)+8))
    shapes.line(STONE_BRICKS, pos((standardW/2)+2+startX, 0, (standardW/2)+4), pos((standardW/2)+2+startX, 0, (standardW/2)+8))

    shapes.line(STONE_BRICKS, pos((standardW/2)-2+startX, 0, (standardW/2)+4), pos((standardW/2)+2+startX, 0, (standardW/2)+4))
    shapes.line(STONE_BRICKS, pos((standardW/2)+2+startX, 0, (standardW/2)+8), pos((standardW/2)-2+startX, 0, (standardW/2)+8))

    shapes.line(WATER, pos((standardW/2)-1+startX, -1, (standardW/2)+5), pos((standardW/2)-1+startX, -1, (standardW/2)+7))
    shapes.line(WATER, pos((standardW/2)+startX, -1, (standardW/2)+5), pos((standardW/2)+startX, -1, (standardW/2)+7))
    shapes.line(WATER, pos((standardW/2)+1+startX, -1, (standardW/2)+5), pos((standardW/2)+1+startX, -1, (standardW/2)+7))
}

function MakeFlor(){
    for(let x=startX; x<standardW+startX; x++){
        shapes.line(END_STONE_BRICKS, pos(x, -1, 0), pos(x, -1, standardW))
    }
}

let standardH = 10
let standardW = 39
let startX = 10;