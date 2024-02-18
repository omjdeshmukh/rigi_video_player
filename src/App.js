import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/player/VideoPlayer";
import Home from "./pages/home/Home";
import "./App.css";
import { AppProvider } from "./context/AppContext";

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<AppStyled className=''>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/video/:id' element={<VideoPlayer />} />
					</Routes>
				</AppStyled>
			</BrowserRouter>
		</AppProvider>
	);
}

const AppStyled = styled.div``;

export default App;
