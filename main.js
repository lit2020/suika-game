import { Bodies, Body, Engine, Render, Runner, World, Collision } from "matter-js";
import { FRUITS_BASE as FRUITS } from "./fruits";

/* Constans */
const background_color = '#F7F4C8';
const wall_color = '#E6B143';

const engine = Engine.create();
const world = engine.world;

const [board_width, board_height] = [620, 850];
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: background_color,
    width: board_width,
    height: board_height,
  }
});

const [wall_width, wall_heignt] = [30, 790];
const center_left_wall = [wall_width / 2, wall_heignt / 2];
const center_right_wall = [board_width - wall_width / 2, wall_heignt / 2];

const leftWall = Bodies.rectangle(
  center_left_wall[0], center_left_wall[1],
  wall_width, wall_heignt,
  {
    isStatic: true,
    render: { fillStyle: wall_color }
  });

const rightWall = Bodies.rectangle(
  center_right_wall[0], center_right_wall[1],
  wall_width, wall_heignt,
  {
    isStatic: true,
    render: { fillStyle: wall_color }
  });

const groud_height = board_height - wall_heignt;
const center_ground = [board_width / 2, board_height - groud_height / 2]

const ground = Bodies.rectangle(
  center_ground[0], center_ground[1],
  board_width, groud_height,
  {
    isStatic: true,
    render: { fillStyle: wall_color }
  });

const top_line_thick = 2;
const topLine = Bodies.rectangle(
  board_width / 2, board_height / 10,
  board_width, top_line_thick,
  {
    isStatic: true,
    isSensor: true, /* 센서로만 동작, 통과 가능 */
    render: { fillStyle: wall_color }
  }
);

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);

/* 과일 생성 */

let currentBody = null;
let currentFruit = null;
let disableAction = false;
let loading = false;


async function addFruit() {
  const index = Math.floor(Math.random() * 6);
  const fruit = FRUITS[index];
  loadImage(`${fruit.name}.png`,
    url => {
      const fruit_body = Bodies.circle(board_width / 2, 50, fruit.radius,
        {
          index: index,
          isSleeping: true,
          render: {
            sprite: { texture: url }
          },
          restitution: 0.4
        });
      currentBody = fruit_body;
      currentFruit = fruit;
      World.add(world, fruit_body);
    },
    () => {
      console.log("Error  Loading ");
    }
  )
}

/* 키 입력 */
const loadImage = (url, onSuccess, onError) => {
  const img = new Image();
  img.onload = () => {
    onSuccess(img.src);
  };
  img.onError = onError();
  img.src = url;
}

window.addEventListener("keydown", (e) => {
  if (!disableAction) {
    switch (e.code) {
      case "KeyA":
        Body.setPosition(currentBody, {
          x: currentBody.position.x - 15,
          y: currentBody.position.y
        })
        break;
      case "KeyD":
        Body.setPosition(currentBody, {
          x: currentBody.position.x + 15,
          y: currentBody.position.y
        })
        break;
      case "KeyS":
        disableAction = true;
        currentBody.isSleeping = false;
        setTimeout(() => {
          addFruit();
          disableAction = false;
        }, 600);
        break;
    }
  }
});

addFruit();
