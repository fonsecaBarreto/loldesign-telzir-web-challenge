import Content from "./Content"
import Header from "./Header"
import "./style.css"

export const MainLayout = ({children}: any) =>{

  const handleChanges = ( key:string, payload: string) =>{
   
	}

  return (
    <div id="main-layout">
      <Header onChange={handleChanges}/>
      <Content>
        {children}
      </Content>
    </div>
  )
}

export default MainLayout