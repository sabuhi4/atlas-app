import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { dataService } from '@/services/dataService';
import { showError } from '@/utils/notifications';

interface ImageUploadZoneProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({ value, onChange, label = 'Event Image' }) => {
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    disabled: isUploading,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setIsUploading(true);
      try {
        const url = await dataService.uploadEventImage(file);
        onChange(url);
      } catch (err) {
        showError((err as Error).message || 'Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    },
  });

  if (value) {
    return (
      <Box>
        <Typography variant="body2" color="text.secondary" mb={1} fontWeight={500}>
          {label}
        </Typography>
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            height: 200,
          }}
        >
          <Box
            component="img"
            src={value}
            alt="Event preview"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 1 },
            }}
          >
            <IconButton
              onClick={() => onChange('')}
              sx={{ bgcolor: 'error.main', color: 'white', '&:hover': { bgcolor: 'error.dark' } }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" mb={1} fontWeight={500}>
        {label}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'divider',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
          minHeight: 140,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <>
            <CircularProgress size={36} />
            <Typography variant="body2" color="text.secondary">Uploading...</Typography>
          </>
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            <Typography variant="body1" fontWeight={500}>
              {isDragActive ? 'Drop image here' : 'Drag & drop or click to upload'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              PNG, JPG, WebP up to 10MB
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};
