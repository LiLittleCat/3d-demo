import React from 'react';
import { List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { Surface } from '../types';

interface SurfaceListProps {
  surfaces: Surface[];
  onDeleteSurface: (index: number) => void;
  onFocusSurface: (surface: Surface) => void;
}

function SurfaceList({ surfaces, onDeleteSurface, onFocusSurface }: SurfaceListProps) {
  return (
    <List>
      {surfaces.length === 0 ? (
        <ListItem>
          <ListItemText primary="还没有添加任何面。" />
        </ListItem>
      ) : (
        surfaces.map((surface, index) => (
          <ListItem key={index}>
            <IconButton onClick={() => onFocusSurface(surface)} size="small">
              <LocationSearchingIcon />
            </IconButton>
            <ListItemText 
              primary={`面 ${index + 1}`} 
              secondary={`点: (${surface.point.x}, ${surface.point.y}, ${surface.point.z}), 法向量: (${surface.normal.x}, ${surface.normal.y}, ${surface.normal.z})`} 
            />
            <Button onClick={() => onDeleteSurface(index)} color="error" size="small">
              删除
            </Button>
          </ListItem>
        ))
      )}
    </List>
  );
}

export default SurfaceList;