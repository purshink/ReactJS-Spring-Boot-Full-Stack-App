import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import { useState } from 'react';
import { useNavigate } from 'react-router';

const TestForm = () => {
    let navigate = useNavigate();
	let key = 1;

    const questions = [
		{
			questionText: 'What is missing in your life?',
			answerOptions: [
				{ answerText: 'Excitement', category: "Fun" },
				{ answerText: 'Mental stimulation', category: "Intellectual"  },
				{ answerText: 'Pushing my boundaries', category: "Active"  },
				{ answerText: 'Creativity', category: "Creative"  },
			],
		},
		{
			questionText: 'Do you enjoy social activities?',
			answerOptions: [
				{ answerText: 'Yes', category: "Social" },
				{ answerText: 'No', category: "Other"  },
				{ answerText: 'Sometimes', category: "Social"  },
				{ answerText: 'Not sure', category: "Other"  },
			],
		},
		{
			questionText: 'Are you an active person?',
			answerOptions: [
				{ answerText: 'Yes', category: "Active" },
				{ answerText: 'No', category: "Other"  },
				{ answerText: 'Sometimes', category: "Active"  },
				{ answerText: 'Not sure', category: "Other"  },
			],
		},
		{
			questionText: 'How did you spend your last weekend?',
			answerOptions: [
				{ answerText: 'On the computer', category: "Intellectual" },
				{ answerText: 'On the couch', category: "Relax"  },
				{ answerText: 'Outside', category: "Active"  },
				{ answerText: 'Other', category: "Other"  },
			],
		},
		{
			questionText: 'Where did you spent your last vacation?',
			answerOptions: [
				{ answerText: 'In the mountains', category: "Active" },
				{ answerText: 'On the beach', category: "Relax"  },
				{ answerText: 'At home', category: "Relax"  },
				{ answerText: 'Other', category: "Other"  },
			],
		},
		{
			questionText: "What is the best compliment you've ever received?",
			answerOptions: [
				{ answerText: 'You are creative', category: "Creative" },
				{ answerText: 'You are fit', category: "Active"  },
				{ answerText: 'You are smart', category: "Intellectual"  },
				{ answerText: 'You are a good person', category: "Social"  },
			],
		},
		{
			questionText: 'Are you willing to commit?',
			answerOptions: [
				{ answerText: 'Yes, always', category: "Other" },
				{ answerText: 'Sometimes', category: "Other"  },
				{ answerText: 'Only if I find the perfect activity', category: "Other"  },
				{ answerText: 'No', category: "Other"  },
			],
		},
		{
			questionText: 'Your location?',
			answerOptions: [
				{ answerText: 'Zurich', category: "Zutich" },
				{ answerText: 'Bern', category: "Other"  },
				{ answerText: 'Luzern', category: "Other"   },
				{ answerText: 'Zug', category: "Other"   },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [categories, setCategoris] = useState([]);
	const [location, setLocation] = useState('Other');

	const handleAnswerOptionClick = (answer) => {
		const updatedCategories = [...categories, answer];
		setCategoris(updatedCategories)

		const nextQuestion = currentQuestion + 1;
		setCurrentQuestion(nextQuestion)
		if (nextQuestion === questions.length) {
			setLocation(answer)
			navigate("/user-home")
		} 
	};
    return (
		<div>
		<div className="test-content">
        <div className='test-form'>
     
        {false ? (
            <div className='score-section'>You scored 1 out of {questions.length}</div>
        ) : (
            <>
                <div className='question-section'>
                    <div className='question-count'>
                        <span>Question {currentQuestion +1}</span>
                    </div>
					
                    <div className='question-text'>{questions[currentQuestion].questionText}</div>
				
                </div>
                <div className='answer-section'>
				{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button key={key++} className="test-button" onClick={() => handleAnswerOptionClick(answerOption.category)}>{answerOption.answerText}</button>
						))}
                </div>
            </>
        )}
		</div>
    </div>
	<footer className="footer bg-transparent  py-2">
        <div className="container-fluid text-center">
            <div className="footer-background h5 text-white">
                &copy; Hobbie 2021. All rights reserved.
            </div>
        </div>
        </footer>
		   <img className="blueImg3" src={blueImg} alt="blueImg3"/>
<img className="blueImg4" src={blueImg} alt="blueImg4"/>
<img className="blue" src={blueImg} alt="blue"></img>
	</div>
	
    )
}

export default TestForm
