import { useReactMediaRecorder as useRecording } from 'react-media-recorder';

const PhuKien = () => {
    const { startRecording, stopRecording, mediaBlobUrl } = useRecording({ audio: true });
    return (
        <div>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <audio hidden src={mediaBlobUrl} controls autoPlay></audio>
        </div>
    );
};

export default PhuKien;
