import {
  dropContact,
  fetchContacts,
  fetchSettings,
  findContactById,
  updateSettings,
  writeContact,
} from "../services/general.services.js";

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
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to update settings",
    });
  }
};

export const uploadContact = async (req, res) => {
  try {
    const body = req.body;
    await writeContact(body);
    return res.status(500).json({
      success: true,
      message: "Message submitted successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to submit message",
    });
  }
};

export const pullContacts = async (req, res) => {
  try {
    const contacts = await fetchContacts();
    return res.status(500).json(contacts);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to fetch contacts",
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await dropContact(id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted message",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to delete message",
    });
  }
};

export const viewContact = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await findContactById(id);
    return res.status(200).json(message);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "failed to delete message",
    });
  }
};
