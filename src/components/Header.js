import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";

function Header() {
    const signOut = useSignOut()
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser();
    const [profileClickState, setProfileClickState] = useState(false);
    const amountOfProdInCart = isAuthenticated() ? auth.cart.length : window.localStorage.length;
    const [sizeWindow, setSizeWindow] = useState(window.innerWidth);
    const [scrollWindow, setScrollWindow] = useState(window.scrollY);
    const [burgerState, setBurgerState] = useState(true);
    const location = useLocation();
    window.addEventListener("resize", () => setSizeWindow(window.innerWidth));
    window.addEventListener("scroll", () => setScrollWindow(window.scrollY));
    return (
        <header style={burgerState ? {
            borderRadius: scrollWindow > 20 ? "0 0 2em 2em" : "0",
            background: scrollWindow > 20 ? "rgba(23, 140, 164)" : "rgba(0, 0, 0, 0)",
            boxShadow: scrollWindow > 20 ? "0 0 .3em rgba(0,0,0,0.5)" : "",
            animation: scrollWindow > 20 ? "slideDown .7s" : "slideSide .7s"
        } : {paddingBottom: "17em"}}>
            <div className="header__left-side">
                <Link to="/">
                    <svg width={sizeWindow > 1200 ? "250" : "200"} viewBox="0 0 320 100.02500534057617"
                         className="looka-1j8o68f">
                        <defs id="SvgjsDefs8710"></defs>
                        <g id="SvgjsG8711" featurekey="symbolFeature-0"
                           transform="matrix(1.25,0,0,1.25,-12.5,-12.48749852180481)" fill="#f9f7f0">
                            <polygon xmlns="http://www.w3.org/2000/svg"
                                     points="49.99,20.38 46.03,27.25 53.97,27.25 "></polygon>
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="M49.99,36.69c7.38,0,13.36-5.97,13.36-13.34c0-7.38-5.98-13.36-13.36-13.36c-7.36,0-13.34,5.98-13.34,13.36  C36.65,30.73,42.63,36.69,49.99,36.69z M43.62,27.72l5.57-9.66c0.33-0.58,1.28-0.58,1.62,0l5.57,9.66c0.17,0.28,0.17,0.63,0,0.93  c-0.17,0.28-0.48,0.46-0.82,0.46H44.42c-0.32,0-0.63-0.19-0.8-0.46C43.45,28.35,43.45,28,43.62,27.72z"></path>
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="M49.99,63.31c-7.36,0-13.34,5.97-13.34,13.34c0,7.38,5.98,13.36,13.34,13.36c7.38,0,13.36-5.98,13.36-13.36  C63.35,69.27,57.37,63.31,49.99,63.31z M56.23,81.57c0.35,0.35,0.35,0.95,0,1.3c-0.19,0.19-0.43,0.28-0.67,0.28  c-0.22,0-0.46-0.09-0.65-0.28l-4.91-4.91l-4.92,4.91c-0.19,0.19-0.43,0.28-0.67,0.28c-0.22,0-0.46-0.09-0.65-0.28  c-0.35-0.35-0.35-0.95,0-1.3l4.92-4.92l-4.92-4.92c-0.35-0.35-0.35-0.95,0-1.3c0.37-0.37,0.95-0.37,1.32,0l4.92,4.92l4.91-4.92  c0.37-0.37,0.95-0.37,1.32,0c0.35,0.35,0.35,0.95,0,1.3l-4.92,4.92L56.23,81.57z"></path>
                            <rect xmlns="http://www.w3.org/2000/svg" x="18.7" y="45.35" width="9.29"
                                  height="9.29"></rect>
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="M23.34,36.64C15.97,36.64,10,42.62,10,50c0,7.38,5.97,13.36,13.34,13.36c7.38,0,13.36-5.98,13.36-13.36  C36.7,42.62,30.72,36.64,23.34,36.64z M29.85,55.57c0,0.52-0.41,0.93-0.93,0.93H17.77c-0.5,0-0.93-0.41-0.93-0.93V44.43  c0-0.52,0.43-0.93,0.93-0.93h11.15c0.52,0,0.93,0.41,0.93,0.93V55.57z"></path>
                            <circle xmlns="http://www.w3.org/2000/svg" cx="76.66" cy="50" r="4.65"></circle>
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="M76.66,36.64c-7.38,0-13.36,5.98-13.36,13.36c0,7.38,5.98,13.36,13.36,13.36C84.02,63.36,90,57.38,90,50  C90,42.62,84.02,36.64,76.66,36.64z M76.66,56.5c-3.59,0-6.5-2.92-6.5-6.5s2.92-6.5,6.5-6.5c3.59,0,6.5,2.92,6.5,6.5  S80.24,56.5,76.66,56.5z"></path>
                        </g>

                        <g id="SvgjsG8712" featurekey="nameFeature-0"
                           transform="matrix(0.7457121211672961,0,0,0.7457121211672961,118.15063428086502,4.946309660326399)"
                           fill="#f9f7f0">
                            <path
                                d="M2.48 40 l0 -28 l13.24 0 c4.28 0 7.24 1.12 9.12 3.04 c1.64 1.6 2.48 3.76 2.48 6.52 l0 0.08 c0 4.28 -2.28 7.12 -5.76 8.6 l6.68 9.76 l-8.96 0 l-5.64 -8.48 l-0.08 0 l-3.32 0 l0 8.48 l-7.76 0 z M10.24 25.439999999999998 l5.12 0 c2.64 0 4.16 -1.28 4.16 -3.32 l0 -0.08 c0 -2.2 -1.6 -3.32 -4.2 -3.32 l-5.08 0 l0 6.72 z M41.120000000000005 40.52 c-6.8 0 -11.6 -4.52 -11.6 -11.24 l0 -0.08 c0 -6.32 4.52 -11.32 10.92 -11.32 c7.48 0 10.92 5.48 10.92 11.84 c0 0.48 0 1.04 -0.04 1.56 l-14.48 0 c0.6 2.36 2.32 3.56 4.68 3.56 c1.8 0 3.24 -0.68 4.8 -2.2 l4.2 3.48 c-2.08 2.64 -5.08 4.4 -9.4 4.4 z M36.72 27.4 l7.52 0 c-0.28 -2.4 -1.68 -3.92 -3.76 -3.92 c-2 0 -3.36 1.56 -3.76 3.92 z M68.8 40.48 c-3.28 0 -5.2 -1.48 -6.6 -3.12 l0 2.64 l-7.6 0 l0 -29.2 l7.6 0 l0 10.44 c1.48 -1.8 3.32 -3.36 6.56 -3.36 c5.16 0 9.6 4.28 9.6 11.2 l0 0.08 c0 7.04 -4.44 11.32 -9.56 11.32 z M66.44 34.12 c2.48 0 4.44 -2 4.44 -4.92 l0 -0.08 c0 -2.84 -1.96 -4.88 -4.44 -4.88 c-2.44 0 -4.4 2.04 -4.4 4.88 l0 0.08 c0 2.88 1.96 4.92 4.4 4.92 z M81.64 16.4 l0 -5.6 l7.92 0 l0 5.6 l-7.92 0 z M81.8 40 l0 -21.64 l7.6 0 l0 21.64 l-7.6 0 z M93.64 40 l0 -21.64 l7.6 0 l0 4.36 c1.24 -2.96 3.24 -4.88 6.84 -4.72 l0 8 l-0.64 0 c-3.96 0 -6.2 2.28 -6.2 7.28 l0 6.72 l-7.6 0 z M119.36 40.44 c-4.56 0 -7.28 -2 -7.28 -7.16 l0 -8.8 l-2.56 0 l0 -6.12 l2.56 0 l0 -5.48 l7.6 0 l0 5.48 l5.04 0 l0 6.12 l-5.04 0 l0 7.32 c0 1.52 0.68 2.16 2.08 2.16 c1 0 1.96 -0.28 2.88 -0.72 l0 5.96 c-1.36 0.76 -3.16 1.24 -5.28 1.24 z M128 40 l0 -29.2 l7.6 0 l0 10.52 c1.4 -1.8 3.4 -3.44 6.48 -3.44 c4.6 0 7.36 3.04 7.36 7.96 l0 14.16 l-7.6 0 l0 -11.72 c0 -2.36 -1.24 -3.64 -3.04 -3.64 c-1.84 0 -3.2 1.28 -3.2 3.64 l0 11.72 l-7.6 0 z M175.88 40.48 c-4.96 0 -9.68 -1.56 -13.12 -4.64 l4.32 -5.16 c2.76 2.2 5.84 3.36 9.08 3.36 c2.08 0 3.2 -0.72 3.2 -1.92 l0 -0.08 c0 -1.16 -0.92 -1.8 -4.72 -2.68 c-5.96 -1.36 -10.56 -3.04 -10.56 -8.8 l0 -0.08 c0 -5.2 4.12 -8.96 10.84 -8.96 c4.76 0 8.48 1.28 11.52 3.72 l-3.88 5.48 c-2.56 -1.8 -5.36 -2.76 -7.84 -2.76 c-1.88 0 -2.8 0.8 -2.8 1.8 l0 0.08 c0 1.28 0.96 1.84 4.84 2.72 c6.44 1.4 10.44 3.48 10.44 8.72 l0 0.08 c0 5.72 -4.52 9.12 -11.32 9.12 z M198.72000000000003 40.44 c-4.56 0 -7.28 -2 -7.28 -7.16 l0 -8.8 l-2.56 0 l0 -6.12 l2.56 0 l0 -5.48 l7.6 0 l0 5.48 l5.04 0 l0 6.12 l-5.04 0 l0 7.32 c0 1.52 0.68 2.16 2.08 2.16 c1 0 1.96 -0.28 2.88 -0.72 l0 5.96 c-1.36 0.76 -3.16 1.24 -5.28 1.24 z M217.80000000000004 40.52 c-6.92 0 -11.92 -5.08 -11.92 -11.24 l0 -0.08 c0 -6.16 5.04 -11.32 12 -11.32 c6.92 0 11.92 5.08 11.92 11.24 l0 0.08 c0 6.16 -5.04 11.32 -12 11.32 z M217.88000000000002 34.08 c2.76 0 4.52 -2.2 4.52 -4.8 l0 -0.08 c0 -2.64 -1.92 -4.88 -4.6 -4.88 c-2.76 0 -4.52 2.2 -4.52 4.8 l0 0.08 c0 2.64 1.92 4.88 4.6 4.88 z M233.00000000000003 40 l0 -21.64 l7.6 0 l0 4.36 c1.24 -2.96 3.24 -4.88 6.84 -4.72 l0 8 l-0.64 0 c-3.96 0 -6.2 2.28 -6.2 7.28 l0 6.72 l-7.6 0 z M260.44000000000005 40.52 c-6.8 0 -11.6 -4.52 -11.6 -11.24 l0 -0.08 c0 -6.32 4.52 -11.32 10.92 -11.32 c7.48 0 10.92 5.48 10.92 11.84 c0 0.48 0 1.04 -0.04 1.56 l-14.48 0 c0.6 2.36 2.32 3.56 4.68 3.56 c1.8 0 3.24 -0.68 4.8 -2.2 l4.2 3.48 c-2.08 2.64 -5.08 4.4 -9.4 4.4 z M256.04 27.4 l7.52 0 c-0.28 -2.4 -1.68 -3.92 -3.76 -3.92 c-2 0 -3.36 1.56 -3.76 3.92 z"></path>
                        </g>
                        <g id="SvgjsG8713" featurekey="sloganFeature-0"
                           transform="matrix(1,0,0,1,119.00000023841858,44.02000045776367)" fill="#f9f7f0">
                            <path
                                d="M4.16 6 c1.34 0.16 2.4 1.3 2.4 2.68 l0 2.12 c0 1.58 -1.3 2.88 -2.88 2.88 l-1.66 0 l0 6.32 l-1.02 0 l0 -14 l2.88 0 l0.28 0 z M5.54 10.8 l0 -2.12 c0 -0.92 -0.74 -1.68 -1.66 -1.68 l-1.86 0 l0 5.66 l1.66 0 c1.02 0 1.86 -0.84 1.86 -1.86 z M14.08 6 l1.02 0 l0 11.46 c0 1.4 -1.1 2.52 -2.46 2.52 l-1.62 0 c-1.36 0 -2.46 -1.12 -2.46 -2.52 l0 -11.46 l1.02 0 l0 11.46 c0 0.84 0.64 1.5 1.44 1.5 l1.62 0 c0.8 0 1.44 -0.66 1.44 -1.5 l0 -11.46 z M23.64 9.84 l-1.02 0 l0 -1.6 c0 -0.68 -0.5 -1.24 -1.12 -1.24 l-1.92 0 c-0.8 0 -1.46 0.72 -1.46 1.54 c-0.02 2.34 1.02 2.86 2.3 3.52 c1.52 0.78 3.22 1.64 3.22 5.32 c0 0.72 -0.28 1.4 -0.76 1.88 c-0.46 0.46 -1.06 0.72 -1.7 0.72 l-2.08 0 c-1.1 0 -2 -0.94 -2 -2.1 l0 -1.5 l1.02 0 l0 1.5 c0 0.6 0.44 1.08 0.98 1.08 l2.08 0 c0.36 0 0.72 -0.14 0.98 -0.4 c0.3 -0.3 0.48 -0.74 0.46 -1.18 c0 -3.06 -1.22 -3.68 -2.66 -4.42 c-1.34 -0.68 -2.86 -1.46 -2.86 -4.42 c0 -1.32 0.98 -2.4 2.2 -2.54 l0.28 0 l1.92 0 l0.24 0 c1.08 0.14 1.9 1.08 1.9 2.24 l0 1.6 z M31.18 6 l1.02 0 l0 14 l-1.02 0 l0 -6.22 l-4.52 0 l0 6.22 l-1.02 0 l0 -14 l1.02 0 l0 6.78 l4.52 0 l0 -6.78 z M45.06 10.48 l-1.02 0 l0 -1.92 c0 -0.86 -0.64 -1.56 -1.44 -1.56 l-1.62 0 c-0.8 0 -1.44 0.7 -1.44 1.56 l0 8.84 c0 0.86 0.64 1.56 1.44 1.56 l1.62 0 c0.8 0 1.44 -0.7 1.44 -1.56 l0 -3.42 l-1.92 0 l0 -1 l2.94 0 l0 4.42 c0 1.42 -1.1 2.56 -2.46 2.56 l-1.62 0 c-1.36 0 -2.46 -1.14 -2.46 -2.56 l0 -8.84 c0 -1.32 0.94 -2.4 2.16 -2.56 c0.1 0 0.2 -0.02 0.3 -0.02 l1.62 0 c0.1 0 0.2 0.02 0.3 0.02 c1.22 0.16 2.16 1.24 2.16 2.56 l0 1.92 z M51.4 6 l2.88 14 l-1.04 0 l-2.48 -12.04 c-0.5 1.9 -1.44 5.44 -3.24 12.04 l-1.06 0 c1.4 -5.16 3.34 -12.3 3.78 -14 l1.16 0 z M63.58 6 l0.88 0 l0 14 l-1.02 0 l0 -10.38 l-2.98 9 l-3.16 -9.12 l0 10.5 l-1.02 0 l0 -14 l0.88 0 l3.28 9.46 z M72.52000000000001 13.76 l-5.04 0 l0 5.22 l5.04 0 l0 1 l-5.04 0 l0 0.02 l-1.02 0 l0 -14.02 l6.06 0 l0 1.02 l-5.04 0 l0 5.74 l5.04 0 l0 1.02 z M81.06000000000002 9.84 l-1.02 0 l0 -1.6 c0 -0.68 -0.5 -1.24 -1.12 -1.24 l-1.92 0 c-0.8 0 -1.46 0.72 -1.46 1.54 c-0.02 2.34 1.02 2.86 2.3 3.52 c1.52 0.78 3.22 1.64 3.22 5.32 c0 0.72 -0.28 1.4 -0.76 1.88 c-0.46 0.46 -1.06 0.72 -1.7 0.72 l-2.08 0 c-1.1 0 -2 -0.94 -2 -2.1 l0 -1.5 l1.02 0 l0 1.5 c0 0.6 0.44 1.08 0.98 1.08 l2.08 0 c0.36 0 0.72 -0.14 0.98 -0.4 c0.3 -0.3 0.48 -0.74 0.46 -1.18 c0 -3.06 -1.22 -3.68 -2.66 -4.42 c-1.34 -0.68 -2.86 -1.46 -2.86 -4.42 c0 -1.32 0.98 -2.4 2.2 -2.54 l0.28 0 l1.92 0 l0.24 0 c1.08 0.14 1.9 1.08 1.9 2.24 l0 1.6 z M87.38000000000002 6 l8 0 l0 1 l-3.36 0 l0 13 l-1.02 0 l0 -13 l-3.62 0 l0 -1 z M102.92000000000003 6 l1.02 0 l0 14 l-1.02 0 l0 -6.22 l-4.52 0 l0 6.22 l-1.02 0 l0 -14 l1.02 0 l0 6.78 l4.52 0 l0 -6.78 z M109.06000000000003 13.620000000000001 l4.08 6.38 l-1.2 0 l-4.06 -6.34 l-0.92 0 l0 6.32 l-1.02 0 l0 -13.98 l2.88 0 l0.28 0 c1.34 0.16 2.4 1.3 2.4 2.68 l0 2.1 c0 1.44 -1.06 2.64 -2.44 2.84 z M106.96000000000002 12.64 l1.66 0 c1.02 0 1.86 -0.82 1.86 -1.86 l0 -2.1 c0 -0.92 -0.74 -1.68 -1.66 -1.68 l-1.86 0 l0 5.64 z M119.48000000000003 6 c1.24 0.14 2.2 1.18 2.2 2.46 l0 9.04 c0 1.36 -1.1 2.46 -2.46 2.46 l-1.62 0 c-1.36 0 -2.46 -1.1 -2.46 -2.46 l0 -9.04 c0 -1.28 0.98 -2.32 2.22 -2.46 l0.24 0 l1.62 0 l0.26 0 z M120.66000000000003 17.5 l0 -9.04 c0 -0.8 -0.64 -1.46 -1.44 -1.46 l-1.62 0 c-0.8 0 -1.44 0.66 -1.44 1.46 l0 9.04 c0 0.8 0.64 1.46 1.44 1.46 l1.62 0 c0.8 0 1.44 -0.66 1.44 -1.46 z M129.20000000000005 6 l1.02 0 l0 11.46 c0 1.4 -1.1 2.52 -2.46 2.52 l-1.62 0 c-1.36 0 -2.46 -1.12 -2.46 -2.52 l0 -11.46 l1.02 0 l0 11.46 c0 0.84 0.64 1.5 1.44 1.5 l1.62 0 c0.8 0 1.44 -0.66 1.44 -1.5 l0 -11.46 z M138.76000000000002 10.48 l-1.02 0 l0 -1.92 c0 -0.86 -0.64 -1.56 -1.44 -1.56 l-1.62 0 c-0.8 0 -1.44 0.7 -1.44 1.56 l0 8.84 c0 0.86 0.64 1.56 1.44 1.56 l1.62 0 c0.8 0 1.44 -0.7 1.44 -1.56 l0 -3.42 l-1.92 0 l0 -1 l2.94 0 l0 4.42 c0 1.42 -1.1 2.56 -2.46 2.56 l-1.62 0 c-1.36 0 -2.46 -1.14 -2.46 -2.56 l0 -8.84 c0 -1.32 0.94 -2.4 2.16 -2.56 c0.1 0 0.2 -0.02 0.3 -0.02 l1.62 0 c0.1 0 0.2 0.02 0.3 0.02 c1.22 0.16 2.16 1.24 2.16 2.56 l0 1.92 z M146.3 6 l1.02 0 l0 14 l-1.02 0 l0 -6.22 l-4.52 0 l0 6.22 l-1.02 0 l0 -14 l1.02 0 l0 6.78 l4.52 0 l0 -6.78 z"></path>
                        </g>
                        <g id="SvgjsG8714" featurekey="sloganFeature-1"
                           transform="matrix(1,0,0,1,118.99999976158142,68.02000045776367)" fill="#f9f7f0">
                            <path
                                d="M8.5 6 l1.18 0 l-3.92 6.66 l-0.02 -0.02 l0 7.36 l-1.02 0 l0 -7.32 l-3.72 -6.68 l1.16 0 l3.1 5.54 z M16.02 6 c1.24 0.14 2.2 1.18 2.2 2.46 l0 9.04 c0 1.36 -1.1 2.46 -2.46 2.46 l-1.62 0 c-1.36 0 -2.46 -1.1 -2.46 -2.46 l0 -9.04 c0 -1.28 0.98 -2.32 2.22 -2.46 l0.24 0 l1.62 0 l0.26 0 z M17.2 17.5 l0 -9.04 c0 -0.8 -0.64 -1.46 -1.44 -1.46 l-1.62 0 c-0.8 0 -1.44 0.66 -1.44 1.46 l0 9.04 c0 0.8 0.64 1.46 1.44 1.46 l1.62 0 c0.8 0 1.44 -0.66 1.44 -1.46 z M25.74 6 l1.02 0 l0 11.46 c0 1.4 -1.1 2.52 -2.46 2.52 l-1.62 0 c-1.36 0 -2.46 -1.12 -2.46 -2.52 l0 -11.46 l1.02 0 l0 11.46 c0 0.84 0.64 1.5 1.44 1.5 l1.62 0 c0.8 0 1.44 -0.66 1.44 -1.5 l0 -11.46 z M31.88 13.620000000000001 l4.08 6.38 l-1.2 0 l-4.06 -6.34 l-0.92 0 l0 6.32 l-1.02 0 l0 -13.98 l2.88 0 l0.28 0 c1.34 0.16 2.4 1.3 2.4 2.68 l0 2.1 c0 1.44 -1.06 2.64 -2.44 2.84 z M29.779999999999998 12.64 l1.66 0 c1.02 0 1.86 -0.82 1.86 -1.86 l0 -2.1 c0 -0.92 -0.74 -1.68 -1.66 -1.68 l-1.86 0 l0 5.64 z M49.2 6 l1.06 0 l-3.5 14 l-0.8 0 l-3.68 -14 l1.04 0 l3.02 11.48 z M58.32000000000001 13.76 l-5.04 0 l0 5.22 l5.04 0 l0 1 l-5.04 0 l0 0.02 l-1.02 0 l0 -14.02 l6.06 0 l0 1.02 l-5.04 0 l0 5.74 l5.04 0 l0 1.02 z M61.34000000000001 20 l-1.02 0 l0 -14 l1.02 0 l0 14 z M69.30000000000001 6 l1.02 0 l0 14 l-0.84 0 l-5.12 -11.16 l0 11.16 l-1.02 0 l0 -14 l0.82 0 l5.14 11.18 l0 -11.18 z M78.86000000000001 9.84 l-1.02 0 l0 -1.6 c0 -0.68 -0.5 -1.24 -1.12 -1.24 l-1.92 0 c-0.8 0 -1.46 0.72 -1.46 1.54 c-0.02 2.34 1.02 2.86 2.3 3.52 c1.52 0.78 3.22 1.64 3.22 5.32 c0 0.72 -0.28 1.4 -0.76 1.88 c-0.46 0.46 -1.06 0.72 -1.7 0.72 l-2.08 0 c-1.1 0 -2 -0.94 -2 -2.1 l0 -1.5 l1.02 0 l0 1.5 c0 0.6 0.44 1.08 0.98 1.08 l2.08 0 c0.36 0 0.72 -0.14 0.98 -0.4 c0.3 -0.3 0.48 -0.74 0.46 -1.18 c0 -3.06 -1.22 -3.68 -2.66 -4.42 c-1.34 -0.68 -2.86 -1.46 -2.86 -4.42 c0 -1.32 0.98 -2.4 2.2 -2.54 l0.28 0 l1.92 0 l0.24 0 c1.08 0.14 1.9 1.08 1.9 2.24 l0 1.6 z"></path>
                        </g>
                    </svg>
                </Link>
            </div>

            {
                <div className={sizeWindow > 810 ? "header__center-side" : "header__menu-mobile"}
                     style={!burgerState ? {
                         display: sizeWindow <= 810 ? "flex" : "none",
                         transition: "opacity .5s"
                     } : {display: sizeWindow > 810 ? "flex" : "none"}
                     } onClick={() => setBurgerState(true)}>
                    <Link to="/"
                          className={location.pathname === "/" ? "category-btn__active" : ""}> Home </Link>
                    <Link to="games"
                          className={location.pathname === "/games" ? "category-btn__active" : ""}> Games </Link>
                    <Link to="consoles"
                          className={location.pathname === "/consoles" ? "category-btn__active" : ""}> Consoles </Link>
                    <Link to="accessories"
                          className={location.pathname === "/accessories" ? "category-btn__active" : ""}> Accessories </Link>
                    <Link to="news"
                          className={location.pathname === "/news" ? "category-btn__active" : ""}> News </Link>
                    <Link to="psn"
                          className={location.pathname === "/psn" || location.pathname === "/authorization" ? "category-btn__active" : ""}> Network </Link>
                </div>
            }
            {sizeWindow > 810 ?
                <div className="header__right-side">
                    <Link to="basket">
                        <div className="header__basket-main">
                            <svg xmlns="http://www.w3.org/2000/svg" width={sizeWindow < 1200 ? "30" : "40"}
                                 viewBox="0 0 24 24"
                                 style={{fill: "#F9F7F0", transform: "", msFilter: ""}}>
                                <path
                                    d="M21 9h-1.42l-3.712-6.496-1.736.992L17.277 9H6.723l3.146-5.504-1.737-.992L4.42 9H3a1.001 1.001 0 0 0-.965 1.263l2.799 10.264A2.005 2.005 0 0 0 6.764 22h10.473c.898 0 1.692-.605 1.93-1.475l2.799-10.263A.998.998 0 0 0 21 9zm-3.764 11v1-1H6.764L4.31 11h15.38l-2.454 9z"></path>
                                <path d="M9 13h2v5H9zm4 0h2v5h-2z"></path>
                            </svg>
                            <div>
                                {amountOfProdInCart}
                            </div>
                        </div>
                    </Link>
                    {isAuthenticated() ?
                        <div className="header__auth-section">
                            <div onClick={() => setProfileClickState(!profileClickState)}
                                 className="header__auth-section--avatar">
                                <img src={auth.avatar} alt=""/>
                            </div>
                            {profileClickState ?
                                <div className="header__auth-section--settings">
                                    <ul>
                                        <li><Link to="authorization/account-setting">Account settings</Link></li>
                                        <li>
                                            <div onClick={() => {
                                                signOut();
                                                localStorage.clear();
                                                fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth["_id"], {
                                                    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                                                    mode: "cors", // no-cors, *cors, same-origin
                                                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                                                    credentials: "same-origin", // include, *same-origin, omit
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        // 'Content-Type': 'application/x-www-form-urlencoded',
                                                    },
                                                    redirect: "follow", // manual, *follow, error
                                                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                                    body: JSON.stringify({isOnline: false})
                                                })
                                                    .then(res => {
                                                        console.log(res)
                                                    })
                                                    .catch(err => console.log(err))
                                                navigate("/");
                                                window.location.reload();
                                            }}>Sign Out
                                            </div>
                                        </li>
                                    </ul>
                                </div> :
                                ""}
                        </div> :
                        <div className="focus-btn category-btn__active">
                            <Link to="authorization"> Sign in</Link>
                        </div>
                    }
                </div> :
                <div className="header__burger" onClick={() => setBurgerState(!burgerState)}>
                    <span className={burgerState ? "log1-1" : "log1-2"}>

                    </span>
                    <span className={burgerState ? "log2-1" : "log2-2"}>

                    </span>
                    <span className={burgerState ? "log3-1" : "log3-2"}>
                    </span>
                </div>
            }
        </header>
    )
}

export default Header;