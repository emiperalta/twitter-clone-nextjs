const timeline = [
  {
    id: 0,
    avatar:
      'http://www.clutchorkickcomics.com/wp-content/uploads/2015/04/Kevin-Profile-Picture.png',
    name: 'Test 1',
    username: 'testdev1',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis accusantium aut nam ipsam delectus mollitia incidunt vero, perspiciatis repudiandae recusandae provident illo autem quos quasi nostrum iusto, adipisci ut ipsum?',
  },
  {
    id: 1,
    avatar:
      'https://i.pinimg.com/236x/fc/0b/25/fc0b25416f9eb3d1e792b4e6b65ca487.jpg',
    name: 'Test 2',
    username: 'testdev2',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quos quas magni deleniti vel rem, dicta, aut quae beatae explicabo iure expedita, sed aliquam velit blanditiis soluta qui. Quasi, dolorum.',
  },
  {
    id: 2,
    avatar:
      'https://i.pinimg.com/280x280_RS/a5/dd/00/a5dd0011cd3eed9be151e7a36720174f.jpg',
    name: 'Test 3',
    username: 'testdev3',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam odit inventore unde maiores tempore repellat est nihil dignissimos, voluptates similique libero ab iure dolores modi ea tempora odio mollitia provident.',
  },
  {
    id: 3,
    avatar:
      'https://i.pinimg.com/474x/55/1f/ff/551fff636303fb8a696c213736ddc09e.jpg',
    name: 'Test 4',
    username: 'testdev4',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga reiciendis, perferendis possimus doloremque, itaque eaque veritatis voluptate sed quisquam eius voluptatem ea at quas numquam quos dicta quia. Consectetur, minima.',
  },
];

export default (req, res) => {
  res.status(200).json(timeline);
};
