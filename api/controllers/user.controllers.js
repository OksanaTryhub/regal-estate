export const test = async (req, res) => {
  try {
    res.send("Hello test");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
