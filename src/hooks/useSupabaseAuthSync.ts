import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import { useUserStore } from '@/store/userStore';

export const useSupabaseAuthSync = () => {
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);

            if (event === 'SIGNED_OUT') {
                setUser(null);
            }

            if (event === 'SIGNED_IN' && session) {
                if (window.location.hash) {
                    window.history.replaceState({}, document.title, window.location.pathname);
                }

                if (location.pathname.startsWith('/auth/')) {
                    navigate('/home', { replace: true });
                }
            }

            if (event === 'TOKEN_REFRESHED') {
                setUser(session?.user ?? null);
            }
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session.user);
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, [setUser, navigate, location]);
};