import type { NextPage } from "next";
import VideoPlayPage from '@/templates/VideoPlayPage/index';

const ViewPage:NexPage = ({params}:any) => {
    const { id } = params
  
    return <VideoPlayPage  id={id} />;
};

export default ViewPage;
