import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, TextField, Box, Typography } from '@mui/material';
import { Point } from '../types';

interface PointListProps {
  points: Point[];
  onDeletePoint: (index: number) => void;
  onUpdatePoint: (index: number, point: Point) => void;
}

function PointList({ points, onDeletePoint, onUpdatePoint }: PointListProps) {
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
        <Typography variant="body1" color="text.secondary">
          还没有添加任何点。
        </Typography>
      ) : (
        points.map((point, index) => (
          <ListItem key={index} divider className="point-list-item">
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
                <ListItemText primary={`点 ${index + 1}: (${point.x}, ${point.y}, ${point.z})`} className="point-list-text" />
                <div className="point-list-actions">
                  <Button onClick={() => handleEdit(index)} color="primary" size="small">
                    编辑
                  </Button>
                  <Button onClick={() => onDeletePoint(index)} color="error" size="small">
                    删除
                  </Button>
                </div>
              </>
            )}
          </ListItem>
        ))
      )}
    </List>
  );
}

export default PointList;
