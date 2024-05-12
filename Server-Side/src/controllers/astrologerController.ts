import { Request, Response } from "express";
import Astrologer, { IAstrologer } from "../models/astrologerModel";

export const registerAstrologer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      gender,
      email,
      languages,
      specialities,//specialities
      profileImageUrl,
    }: { [key: string]: any } = req.body;

    const astrologerData: IAstrologer = {
      name: name || "",
      gender: gender || "",
      email: email || "",
      languages: languages || [],
      specialities: specialities || [], 
      profileImageUrl: profileImageUrl || "",
    } as unknown as IAstrologer;

    const astrologer: IAstrologer = await Astrologer.create(astrologerData);
    res.status(201).json(astrologer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllAstrologers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const astrologers: IAstrologer[] = await Astrologer.find();
    res.status(200).json(astrologers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const editAstrologer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; 
  const updatedAstrologerData: Partial<IAstrologer> = req.body;

  try {
    if (!id) {
      res.status(400).json({ message: "ID parameter is missing." });
      return;
    }

    const updatedAstrologer: IAstrologer | null = await Astrologer.findByIdAndUpdate(
      id,
      updatedAstrologerData,
      { new: true }
    );

    if (!updatedAstrologer) {
      res.status(404).json({ message: "Astrologer not found." });
      return;
    }

    res.status(200).json(updatedAstrologer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
