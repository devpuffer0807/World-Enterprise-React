import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slider,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

const PhotoEditorModal = ({ open, onClose, image, onOK }) => {
  const editorRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const scaleHandler = (event, value, activeThumb) => {
    console.log(value);
    if (typeof value == "number") {
      setScale(value);
    }
  };

  const positionChangeHandler = (position) => {
    console.log(position);
    setPosition(position);
  };

  const okHandler = async () => {
    const canvas = editorRef.current?.getImage().toDataURL();
    if (canvas) {
      await fetch(canvas)
        .then((res) => res.blob())
        .then((blob) => window.URL.createObjectURL(blob))
        .then((imageURL) => {
          onOK(imageURL);
          onClose();
        });
    } else {
      onClose();
    }
  };

  useEffect(() => {
    setScale(1);
    setPosition({ x: 0.5, y: 0.5 });
  }, [image]);
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogContent>
        {image && (
          <AvatarEditor
            ref={editorRef}
            image={image}
            borderRadius={100}
            color={[100, 100, 100, 0.7]}
            scale={scale}
            position={position}
            onPositionChange={positionChangeHandler}
          />
        )}
        <Slider
          size="small"
          value={scale}
          valueLabelDisplay="off"
          min={0.1}
          max={2}
          onChange={scaleHandler}
          step={0.01}
          sx={{
            color: "#000",
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button fullWidth onClick={okHandler}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhotoEditorModal;
