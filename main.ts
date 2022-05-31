function nextGeneration () {
    for (let cellId3 = 0; cellId3 <= 24; cellId3++) {
        friends = 0
        for (let offset of friendsMatrix) {
            targetCellX = cellId3 - 5 * Math.abs(Math.idiv(cellId3, 5)) + offset[0]
            targetCellY = Math.abs(Math.idiv(cellId3, 5)) + offset[1]
            targetCellId = cellId3 + offset[2]
            if (targetCellX >= 0 && targetCellX < 5 && (targetCellY >= 0 && targetCellY < 5)) {
                if (world[targetCellId]) {
                    friends += 1
                }
            }
        }
        newCell = 0
        if (world[cellId3]) {
            if (friends < 2 || friends > 3) {
                newCell = 0
            } else {
                newCell = 1
            }
        } else {
            if (friends == 3) {
                newCell = 1
            }
        }
        world2[cellId3] = newCell
    }
    generation += 1
}
// Start with a random population, then run
input.onButtonPressed(Button.A, function () {
    changed = true
    init()
    randomizeWorld()
    render()
    while (changed) {
        nextGeneration()
        swapWorlds()
        render()
        music.playTone(523, music.beat(BeatFraction.Whole))
        basic.pause(1000)
    }
    music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
})
function init () {
    generation = 0
    world = [25]
    world2 = [25]
    friendsMatrix = [
    [-1, -1, -6],
    [0, -1, -5],
    [1, -1, -4],
    [-1, 0, -1],
    [1, 0, 1],
    [-1, 1, 4],
    [0, 1, 5],
    [1, 1, 6]
    ]
}
function randomizeWorld () {
    for (let cellId = 0; cellId <= 24; cellId++) {
        world[cellId] = randint(0, 1)
    }
}
function render () {
    basic.clearScreen()
    for (let cellId2 = 0; cellId2 <= 24; cellId2++) {
        if (world[cellId2]) {
            led.plot(cellId2 - 5 * Math.abs(Math.idiv(cellId2, 5)), Math.abs(Math.idiv(cellId2, 5)))
        }
    }
}
function swapWorlds () {
    changed = false
    for (let cellId4 = 0; cellId4 <= 24; cellId4++) {
        if (world[cellId4] != world2[cellId4]) {
            changed = true
        }
        world[cellId4] = world2[cellId4]
    }
}
let changed = false
let generation = 0
let world2: number[] = []
let newCell = 0
let world: number[] = []
let targetCellId = 0
let targetCellY = 0
let targetCellX = 0
let friendsMatrix: number[][] = []
let friends = 0
music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
basic.showString("A to start")
