import YouTube, { YouTubeProps } from 'react-youtube';

interface Props{
    videoId: string,
}

const video = (props:Props) => {

    const getYouTubeVideoId = (url:string) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
      }
    
      const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 0,
        },
      };
    
    return <YouTube videoId={getYouTubeVideoId(props.videoId)} className="video-wrapper" opts={opts} onReady={onPlayerReady} />
}

export default video;