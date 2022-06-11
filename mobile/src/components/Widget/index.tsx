import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';
import { FeedbackType } from '../../@types/feedbackTypes';


function Widget() {

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    const bottomSheetRef = useRef<BottomSheet>(null);
    
    function handleOpen(){
        bottomSheetRef.current?.expand();
    }

    function handleRestartFeedback(){
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    function handlefeedbackSent(){
        setFeedbackSent(true);
    }

    return (
        <>
            <TouchableOpacity
                style = {styles.button}
                onPress = {handleOpen}
            >
                <ChatTeardropDots 
                    size={24}
                    weight = "bold"
                    color = {theme.colors.text_on_brand_color}
                />
            </TouchableOpacity>

            <BottomSheet
                ref={ bottomSheetRef }
                snapPoints = {[1, 280]}
                backgroundStyle = {styles.modal}
                handleIndicatorStyle = {styles.indicator}
            >

            {
              feedbackSent ?
                <Success
                    onSendAnotherFeedback={handleRestartFeedback}
                />
                :
                <>
                    {
                        feedbackType ?
                            <Form
                                feedbackType= {feedbackType}
                                onFeedbackCanceled = {handleRestartFeedback}
                                onFeedbackSent = {handlefeedbackSent}
                            />
                            :
                            <Options
                             onFeedbackTypeChanged = {setFeedbackType}
                            />    
                    }
                </>  
            }

            </BottomSheet>
        </>
    );
};

export default gestureHandlerRootHOC(Widget);