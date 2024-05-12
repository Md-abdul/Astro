import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Astrologer {
  _id: string;
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
  profileImageUrl: string;
}

interface AstrologerCardProps {
  astrologer: Astrologer;
}

const AstrologerCard: React.FC<AstrologerCardProps> = ({ astrologer }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={astrologer.profileImageUrl}
        alt={astrologer.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {astrologer.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {astrologer.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {astrologer.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Languages: {astrologer.languages.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Specialties: {astrologer.specialties.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AstrologerCard;
