import React from 'react';
import { Card, CardContent, Typography, ButtonGroup } from '@mui/material';

const MeetingCard = ({ meeting, onUpdate, onCancel }) => {
  const formattedDate = dayjs(meeting.startTime)
    .tz(dayjs.tz.guess())
    .format('MMM D, YYYY h:mm A');

  return (
    <Card className="mb-4 shadow-md">
      <CardContent className="space-y-4">
        <Typography variant="h6" component="h3">
          {meeting.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {meeting.description}
        </Typography>
        <Typography variant="body1">
          {formattedDate} ({meeting.duration} minutes)
        </Typography>
        <Typography variant="body2">
          Participant: {meeting.participantRole}
        </Typography>
        <ButtonGroup variant="outlined" className="space-x-2">
          <Button onClick={() => onUpdate(meeting)} color="primary">
            Update
          </Button>
          <Button onClick={() => onCancel(meeting.id)} color="error">
            Cancel
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};