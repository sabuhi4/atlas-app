import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    void error;
    void info;
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/home';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)' }}
        >
          <Paper
            elevation={0}
            sx={{
              maxWidth: 480,
              width: '100%',
              mx: 2,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                py: 4,
                px: 3,
                textAlign: 'center',
              }}
            >
              <WarningAmberIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />
              <Typography variant="h5" fontWeight={700} color="white">
                Something went wrong
              </Typography>
            </Box>
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary" mb={1}>
                An unexpected error occurred. The team has been notified.
              </Typography>
              {this.state.error && (
                <Typography
                  variant="caption"
                  color="text.disabled"
                  component="pre"
                  sx={{
                    display: 'block',
                    mb: 3,
                    p: 2,
                    bgcolor: 'action.hover',
                    borderRadius: 2,
                    textAlign: 'left',
                    overflow: 'auto',
                    maxHeight: 120,
                    fontSize: '0.7rem',
                  }}
                >
                  {this.state.error.message}
                </Typography>
              )}
              <Button variant="contained" onClick={this.handleReset} sx={{ mt: 1 }}>
                Go to Home
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
