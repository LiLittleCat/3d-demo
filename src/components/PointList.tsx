import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Point } from "../types";

interface PointListProps {
  points: Point[];
  onDeletePoint: (index: number) => void;
  onUpdatePoint: (index: number, point: Point) => void;
  onFocusPoint: (point: Point) => void;
}

function PointList({
  points,
  onDeletePoint,
  onUpdatePoint,
  onFocusPoint,
}: PointListProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editPoint, setEditPoint] = useState<string>("");

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditPoint(`${points[index].x}, ${points[index].y}, ${points[index].z}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPoint(e.target.value);
  };

  const handleUpdate = () => {
    if (editIndex !== null) {
      const sanitizedInput = editPoint.replace(/[^\d.,; \n-]/g, "");
      const pointStrings = sanitizedInput.split("\n");
      pointStrings.forEach((pointString, idx) => {
        const [x, y, z] = pointString.split(/[,; ]+/).map(parseFloat);
        onUpdatePoint(editIndex + idx, { x, y, z });
      });
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
                  label="X, Y, Z (逗号, 分号或空格区分)"
                  value={editPoint}
                  onChange={handleChange}
                  size="small"
                />
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  size="small"
                  className="update-point-button"
                >
                  更新
                </Button>
              </Box>
            ) : (
              <>
                <IconButton onClick={() => onFocusPoint(point)} size="small">
                  <LocationSearchingIcon />
                </IconButton>
                <ListItemText
                  primary={`点 ${index + 1}: (${point.x}, ${point.y}, ${point.z})`}
                />
                <Button
                  onClick={() => handleEdit(index)}
                  color="primary"
                  size="small"
                >
                  编辑
                </Button>
                <Button
                  onClick={() => onDeletePoint(index)}
                  color="error"
                  size="small"
                >
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
