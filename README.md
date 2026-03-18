# 3D Tic-Tac Toe

[gif previews]

---

## Where to Play

### Visit [3dtictactoe.caesarbrahh.dev](3dtictactoe.caesarbrahh.dev) to play online

---

## Features

- **3D Game Board** rendered with Three.js  
- **Mouse Interactions** using raycasting  
- **Two Game Modes**
  - **Classic Mode** – standard 3×3×3 tic-tac-toe  
  - **Tower Mode** – gravity-based stacking variant  
- **Dynamic UI**
  - Hover highlighting  
  - Animated player indicator  
  - Start menu + mode selection  
- **Immersive Scene**
  - Starfield background  
  - Lighting + depth effects  
- **Win Detection**
  - All 49 possible 3D winning lines  
  - Winning pieces are highlighted

---

## Controls

- 🖱️ Hover over a position to highlight it
- 🖱️ Click to place a piece
- 🔄 Play Again to restart the current mode
- ⬅️ Back to Menu to switch modes

---

## Project Structure

---

## How it Works

### 3D Board Representation

The game board is represented internally as a **3D matrix**: ```boardMatrix[x][y][z]```

- x -> horizontal axis (left <-> right)
- y -> vertical axis (bottom <-> top)
- z -> depth axis (front <-> back)

Each cell stores ```null``` when initialized, then ```'X'``` or ```'O'```

**Full 3D cube visualization**:
```
   y (height)
   ↑
   |
   |
   o------→ x (left-right)
  /
 /
z (depth)
```

### Coordinate Mapping (World -> Grid)

Three.js uses continuous coordinates, but my game uses discrete indices.

So positions like:
```
x = -1, 0, 1
y = -1, 0, 1
z = -1, 0, 1
```

are mapped to:
```
-1 -> 0
 0 -> 1
 1 -> 2
```

This ensures every 3D position aligns with a matrix index.

### Mouse Interaction

User input is handled using **raycasting**:
```
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(interactiveObjects);
```

**Flow**:
```
Mouse Move
   ↓
Convert to normalized coordinates
   ↓
Raycast into scene
   ↓
Detect intersected object
   ↓
Highlight or place piece
```

### Piece Placement Logic (tower)

When a player clicks:

1. Determine (x, z) position
2. Find lowest available y (gravity logic)

```
for (let y = 0; y < 3; y++) {
  if (boardMatrix[x][y][z] === null) {
    // place piece here
  }
}
```

**Stacking behavior**:
```
Column (x,z):

y=2  [   ]
y=1  [   ]
y=0  [ X ]

↓ next move

y=2  [   ]
y=1  [ O ]
y=0  [ X ]
```

### Scene Object Tracking

In addition to the board logic ```pieceMatrix[x][y][z]``` stores actual Three.js objects.

This gives:
- Direct access to piece
- Efficient updates
- The ability to highlight winning lines

boardMatrix -> game logic
pieceMatrix -> 3D objects

### Win Detection

A 3x3x3 board has **49 possibling winning lines**:

Types:
- 27 straight lines (x, y, z)
- 18 planar diagonals
- 4 space diagonals

**Example winning line**:
```
[
  {x:0,y:0,z:0},
  {x:1,y:1,z:1},
  {x:2,y:2,z:2}
]
```

Check logic:
```
for (const line of winningLines) {
  const a = boardMatrix[line[0].x][line[0].y][line[0].z];
  const b = boardMatrix[line[1].x][line[1].y][line[1].z];
  const c = boardMatrix[line[2].x][line[2].y][line[2].z];

  if (a !== null && a === b && b === c) {
    // winner found
  }
}
```

#### Visual Feedback

When a win occurs:
```
Winning line detected
        ↓
Retrieve pieces from pieceMatrix
        ↓
Modify material / color
        ↓
Highlight on screen
```

### Game Flow

```
Start Menu
   ↓
Select Mode (Classic / Tower)
   ↓
Initialize Scene + Board
   ↓
Player Turn Loop:
   ↓
  Hover → Highlight
   ↓
  Click → Place Piece
   ↓
  Update boardMatrix
   ↓
  Check Winner
   ↓
Game Ends:
   ↓
  Show "Play Again" / "Back to Menu"
```

---

## Tech Stack

- **Three.js** - 3D rendering
- **JavaScript** - game logic
- **Vite** - development + bundling
- **CSS** - custom UI styling

---

## Installation & Setup

### 1. Clone the repo

```
git clone https://github.com/CaesarBrahh/3d-tictactoe.git
```

### 2. Navigate into project

```
cd 3d-tic-tac-toe
```

### 3. Install dependencies

```
npm install
```

### 4. Run development server

```
npm run dev
```