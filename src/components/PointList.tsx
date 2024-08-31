import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, TextField, Box, IconButton } from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { Point } from '../types';

interface PointListProps {
  points: Point[];
  onDeletePoint: (index: number) => void;
  onUpdatePoint: (index: number, point: Point) => void;
  onFocusPoint: (point: Point) => void;
}

function PointList({ points, onDeletePoint, onUpdatePoint, onFocusPoint }: PointListProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editPoint, setEditPoint] = useState<Point>({ x: 0, y: 0, z: 0 });

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditPoint(points[index]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditPoint({ ...editPoint, [name]: parseFloat(value) });
  };

  const handleUpdate = () => {
    if (editIndex !== null) {
      onUpdatePoint(editIndex, editPoint);
      setEditIndex(null);
    }
  };

  return (
    <List>
      {points.length === 0 ? (
        <ListItem>
          <ListItemText primary="还没有添加任何点。" />
        </ListItem>
      ) : (
        points.map((point, index) => (
          <ListItem key={index}>
            {editIndex === index ? (
              <Box className="edit-point-form">
                <TextField
                  className="edit-point-field"
                  name="x"
                  label="X"
                  type="number"
                  value={editPoint.x}
                  onChange={handleChange}
                  size="small"
                />
                <TextField
                  className="edit-point-field"
                  name="y"
                  label="Y"
                  type="number"
                  value={editPoint.y}
                  onChange={handleChange}
                  size="small"
                />
                <TextField
                  className="edit-point-field"
                  name="z"
                  label="Z"
                  type="number"
                  value={editPoint.z}
                  onChange={handleChange}
                  size="small"
                />
                <Button onClick={handleUpdate} variant="contained" size="small" className="update-point-button">
                  更新
                </Button>
              </Box>
            ) : (
              <>
                <IconButton onClick={() => onFocusPoint(point)} size="small">
                  <LocationSearchingIcon />
                </IconButton>
                <ListItemText primary={`点 ${index + 1}: (${point.x}, ${point.y}, ${point.z})`} />
                <Button onClick={() => handleEdit(index)} color="primary" size="small">
                  编辑
                </Button>
                <Button onClick={() => onDeletePoint(index)} color="error" size="small">
                  删除
                </Button>
              </>
            )}
          </ListItem>
        ))
      )}
    </List>
  );
}

export default PointList;
