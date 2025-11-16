import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from '@/store/userStore';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000,
        },
    },
});

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    const isDarkMode = useUserStore((state) => state.isDarkMode);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDarkMode ? 'dark' : 'light',
                    primary: {
                        main: '#6366F1',
                        light: '#818CF8',
                        dark: '#4F46E5',
                    },
                    secondary: {
                        main: '#EC4899',
                        light: '#F472B6',
                        dark: '#DB2777',
                    },
                    background: {
                        default: isDarkMode ? '#0F172A' : '#F8FAFC',
                        paper: isDarkMode ? '#1E293B' : '#FFFFFF',
                    },
                    text: {
                        primary: isDarkMode ? '#F1F5F9' : '#0F172A',
                        secondary: isDarkMode ? '#94A3B8' : '#64748B',
                    },
                },
                typography: {
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    h1: {
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                    },
                    h2: {
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                    },
                    h3: {
                        fontWeight: 700,
                    },
                    h4: {
                        fontWeight: 600,
                    },
                    h5: {
                        fontWeight: 600,
                    },
                    h6: {
                        fontWeight: 600,
                    },
                    button: {
                        fontWeight: 600,
                        textTransform: 'none',
                    },
                },
                shape: {
                    borderRadius: 16,
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: 12,
                                padding: '10px 24px',
                                fontSize: '0.95rem',
                            },
                            contained: {
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                                },
                            },
                        },
                    },
                    MuiChip: {
                        styleOverrides: {
                            root: {
                                borderRadius: 8,
                                fontWeight: 500,
                            },
                        },
                    },
                },
            }),
        [isDarkMode]
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    {children}
                    <Toaster position="top-center" />
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
};