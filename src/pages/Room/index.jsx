import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    const { roomId } = useParams();
    const meetingContainer = useRef(null);

    useEffect(() => {
        const myMeeting = async () => {
            const appID = Number(process.env.REACT_APP_ZEGO_APP_ID);
            const serverSecret = process.env.REACT_APP_ZEGO_SERVER_SECRET;

            if (isNaN(appID)) {
                console.error('appID must be a number');
                return;
            }

            if (!serverSecret || !roomId) {
                console.error('Missing required parameters for Zego UIKit');
                return;
            }

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                "Lakshmi Likitha"
            );

            const zc = ZegoUIKitPrebuilt.create(kitToken);
            if (!zc) {
                console.error('Failed to create Zego UIKit instance');
                return;
            }

            zc.joinRoom({
                container: meetingContainer.current,
                sharedLinks: [
                    {
                        name: 'Copy Link',
                        url: ${window.location.origin}/room/${roomId},
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: true,
            });
        };

        myMeeting();
    }, [roomId]);

    return <div ref={meetingContainer} />;
};

export default RoomPage;
