export default function handler(req, res) {
  res.status(200).json({
    googleApiKey: process.env.GOOGLE_API_KEY || '',
  });
}
