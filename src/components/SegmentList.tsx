import {
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Segment } from "../types";

interface LineListProps {
  segments: Segment[];
  onDeleteSegment: (index: number) => void;
  onFocusSegment: (segment: Segment) => void;
}

function SegmentList({
  segments,
  onDeleteSegment,
  onFocusSegment,
}: LineListProps) {
  return (
    <List>
      {segments.length === 0 ? (
        <ListItem>
          <ListItemText primary="还没有添加任何线。" />
        </ListItem>
      ) : (
        segments.map((segment, index) => (
          <ListItem key={index}>
            <IconButton onClick={() => onFocusSegment(segment)} size="small">
              <LocationSearchingIcon />
            </IconButton>
            <ListItemText
              primary={`线 ${index + 1}`}
              secondary={
                <>
                  起点: ({segment.start.x.toFixed(2)},{" "}
                  {segment.start.y.toFixed(2)}, {segment.start.z.toFixed(2)})
                  <br />
                  终点: ({segment.end.x.toFixed(2)}, {segment.end.y.toFixed(2)},{" "}
                  {segment.end.z.toFixed(2)})
                </>
              }
            />
            <Button
              onClick={() => onDeleteSegment(index)}
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

export default SegmentList;
