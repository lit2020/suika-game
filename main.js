import { Bodies, Engine, Render, Runner, World } from "matter-js";

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
    render: { fillStyle: wall_color }
  }
);

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);