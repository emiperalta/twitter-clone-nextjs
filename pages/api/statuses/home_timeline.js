export default (req, res) => {
  res.status(200).json({ firstName: 'hello', lastName: 'world' });
};
