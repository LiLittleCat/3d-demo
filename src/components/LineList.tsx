import React from 'react';
import { List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { Line } from '../types';

interface LineListProps {
  lines: Line[];
  onDeleteLine: (index: number) => void;
  onFocusLine: (line: Line) => void;
}

function LineList({ lines, onDeleteLine, onFocusLine }: LineListProps) {
  return (
    <List>
      {lines.length === 0 ? (
        <ListItem>
          <ListItemText primary="还没有添加任何线。" />
        </ListItem>
      ) : (
        lines.map((line, index) => (
          <ListItem key={index}>
            <IconButton onClick={() => onFocusLine(line)} size="small">
              <LocationSearchingIcon />
            </IconButton>
            <ListItemText 
              primary={`线 ${index + 1}: ${line.type}`} 
              secondary={`起点: (${line.start.x}, ${line.start.y}, ${line.start.z}), 终点: (${line.end.x}, ${line.end.y}, ${line.end.z})`} 
            />
            <Button onClick={() => onDeleteLine(index)} color="error" size="small">
              删除
            </Button>
          </ListItem>
        ))
      )}
    </List>
  );
}

export default LineList;