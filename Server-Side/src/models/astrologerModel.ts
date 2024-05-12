import mongoose, { Schema, Document } from 'mongoose';

export interface IAstrologer extends Document {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialities: string[]; 
  profileImageUrl: string;
}

const AstrologerSchema: Schema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  languages: { type: [String], required: true },
  specialities: { type: [String], required: true },
  profileImageUrl: { type: String, required: true },
});

export default mongoose.model<IAstrologer>('Astrologer', AstrologerSchema);
