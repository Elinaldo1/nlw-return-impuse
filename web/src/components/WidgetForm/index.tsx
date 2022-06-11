import { useState } from 'react';
import bugImageUrl from '../../assets/Bug.svg';
import ideaImageUrl from '../../assets/Idea.svg';
import tougthImageUrl from '../../assets/Thought.svg';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessSteep } from './Steps/FeedbackSuccessStep';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';


export const feedbackTypes = {
    BUG:{
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA:{
        title: "Idéia",
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma Lâmpada'
        }
    },
    OTHER:{
        title: "Outro",
        image: {
            source: tougthImageUrl,
            alt: 'Imagem de um Balão de pensamento'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

 export function WidgetForm(){

     const [ feedbackType, setFeedbackType ] = useState<FeedbackType | null>(null);
     const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback(){
        setFeedbackSent(false);
        setFeedbackType(null)
    }

     return(
         <div className = "bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto" >

            {
                feedbackSent? (
                    <FeedbackSuccessSteep onFeedbackRestartRequested = {handleRestartFeedback} />
                ) :
                 <>
                    {
                        !feedbackType ?
                        <FeedbackTypeStep onFeedbackTypeChanged = {setFeedbackType} /> :
                        <FeedbackContentStep 
                            feedbackType = {feedbackType} 
                            onFeedbackRestartRequested = { handleRestartFeedback }
                            onFeedbackSent = {() => setFeedbackSent(true)}
                        />
                    }
                 </>
            }
            <footer className = "text-xs text-neutral-400" >
                feito com ❤ por <a className = "underline underline-offset-2" href = "#" >Elinaldo</a> 
            </footer>

         </div>
         
     )
 }