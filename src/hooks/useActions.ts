import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { clearStore, getUserListApi, getAlbumListApi, getPhotoListApi } from "../store/actions";

const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators({clearStore, getUserListApi, getAlbumListApi, getPhotoListApi}, dispatch);
}

export default useActions;