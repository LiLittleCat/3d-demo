import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Surface, SurfaceWithPoints } from "../types";

interface SurfaceListProps {
  surfaces: (Surface | SurfaceWithPoints)[];
  onDeleteSurface: (index: number) => void;
  onFocusSurface: (surface: Surface | SurfaceWithPoints) => void;
}

function SurfaceList({
  surfaces,
  onDeleteSurface,
  onFocusSurface,
}: SurfaceListProps) {
  const renderSurfaceInfo = (surface: Surface | SurfaceWithPoints) => {
    if ("point" in surface && "normal" in surface) {
      return (
        <>
          点: ({surface.point.x.toFixed(2)}, {surface.point.y.toFixed(2)},{" "}
          {surface.point.z.toFixed(2)})
          <br />
          法向量: ({surface.normal.x.toFixed(2)}, {surface.normal.y.toFixed(2)},{" "}
          {surface.normal.z.toFixed(2)})
        </>
      );
    } else if ("points" in surface) {
      return (
        <>
          点1: ({surface.points[0].x.toFixed(2)},{" "}
          {surface.points[0].y.toFixed(2)}, {surface.points[0].z.toFixed(2)})
          <br />
          点2: ({surface.points[1].x.toFixed(2)},{" "}
          {surface.points[1].y.toFixed(2)}, {surface.points[1].z.toFixed(2)})
          <br />
          点3: ({surface.points[2].x.toFixed(2)},{" "}
          {surface.points[2].y.toFixed(2)}, {surface.points[2].z.toFixed(2)})
        </>
      );
    }
    return "无效的表面数据";
  };
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
              secondary={renderSurfaceInfo(surface)}
            />
            <Button
              onClick={() => onDeleteSurface(index)}
              color="error"
              size="small"
            >
              删除
            </Button>
          </ListItem>
        ))
      )}
    </List>
  );
}

export default SurfaceList;
