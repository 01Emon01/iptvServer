import { fetchSettings, updateSettings } from "../services/general.services.js";

export const pullSettings = async (req, res) => {
  try {
    const settings = await fetchSettings();
    return res.status(200).json(settings);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to fetch settings",
    });
  }
};

export const editSettings = async (req, res) => {
  try {
    const body = req.body;
    await updateSettings(body);
    return res.status(200).json({
        success: true,
        message: "Settings updated successfully!",
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "failed to update settings",
    });
  }
};
