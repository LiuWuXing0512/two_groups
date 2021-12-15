import { ConnectRC, Loading, connect, Dispatch } from 'umi';

interface IProps {

}

const HotSearch: ConnectRC<IProps>= (props) =>{

    return <>
    </>

}


const mapStateToProps = (state: any) => {
    
    return {};
  };
  
  const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
      login: () =>
        dispatch({
          type: 'user/login',
          
        }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotSearch);
  