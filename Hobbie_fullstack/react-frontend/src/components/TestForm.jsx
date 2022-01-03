import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import TestResultsService from '../api/hobby/TestResultsService';
import AuthenticationService from '../api/hobby/AuthenticationService';
import { useState} from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TestForm = () => {

	let key = 1;
	let username = AuthenticationService.getLoggedInUser();
	let[loading, setLoading] = useState(true);
	let navigate = useNavigate();

    const questions = [
		{
			questionText: 'What is missing in your life?',
			value: "categoryOne",
			answerOptions: [
				{ answerText: 'Excitement', category: "FUN" },
				{ answerText: 'Mental stimulation', category: "INTELLECTUAL"  },
				{ answerText: 'Pushing my boundaries', category: "ACTIVE"  },
				{ answerText: 'Creativity', category: "CREATIVE"  },
			],
		},
		{
			questionText: 'Do you enjoy social activities?',
			value: "categoryTwo",
			answerOptions: [
				{ answerText: 'Yes', category: "SOCIAL" },
				{ answerText: 'No', category: "OTHER"  },
				{ answerText: 'Sometimes', category: "SOCIAL"  },
				{ answerText: 'Not sure', category: "OTHER"  },
			],
		},
		{
			questionText: 'Are you an active person?',
			value: "categoryThree",
			answerOptions: [
				{ answerText: 'Yes', category: "ACTIVE" },
				{ answerText: 'No', category: "OTHER"  },
				{ answerText: 'Sometimes', category: "ACTIVE"  },
				{ answerText: 'Not sure', category: "OTHER"  },
			],
		},
		{
			questionText: 'How did you spend your last weekend?',
			value: "categoryFour",
			answerOptions: [
				{ answerText: 'On the computer', category: "INTELLECTUAL" },
				{ answerText: 'On the couch', category: "RELAX"  },
				{ answerText: 'Outside', category: "ACTIVE"  },
				{ answerText: 'Other', category: "OTHER"  },
			],
		},
		{
			questionText: 'Where did you spent your last vacation?',
			value: "categoryFive",
			answerOptions: [
				{ answerText: 'In the mountains', category: "ACTIVE" },
				{ answerText: 'On the beach', category: "RELAX"  },
				{ answerText: 'At home', category: "RELAX"  },
				{ answerText: 'Other', category: "OTHER"  },
			],
		},
		{
			questionText: "What is the best compliment you've ever received?",
			value: "categorySix",
			answerOptions: [
				{ answerText: 'You are creative', category: "CREATIVE" },
				{ answerText: 'You are fit', category: "ACTIVE"  },
				{ answerText: 'You are smart', category: "INTELLECTUAL"  },
				{ answerText: 'You are a good person', category: "SOCIAL"  },
			],
		},
		{
			questionText: 'Are you willing to commit?',
			value: "categorySeven",
			answerOptions: [
				{ answerText: 'Yes, always', category: "OTHER",  },
				{ answerText: 'Sometimes', category: "OTHER"  },
				{ answerText: 'Only if I find the perfect activity', category: "OTHER"  },
				{ answerText: 'No', category: "OTHER"  },
			],
		},
		{
			questionText: 'Your location?',
			value: "location",
			answerOptions: [
				{ answerText: 'Zurich', category: "ZURICH" },
				{ answerText: 'Bern', category: "OTHER"  },
				{ answerText: 'Luzern', category: "OTHER"   },
				{ answerText: 'Zug', category: "OTHER"   },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [test, setTest] = useState(	{
		username: username,
		// location: "ZURICH"

});


const handleAnswerOptionClick = (answer) => {


	console.log(questions[currentQuestion].value);
	console.log(answer);
	
	

	setTest(test => ({...test,[questions[currentQuestion].value]: answer  }));


	const nextQuestion = currentQuestion + 1;
	setCurrentQuestion(nextQuestion)
	if (nextQuestion === questions.length) {

		setLoading(false);
	
 
	} 
};

useEffect(() => {
	const check_uploaded = () => {
	  if (!loading) { 
		TestResultsService(test);
		
	  }
	}
	check_uploaded()
  }, [loading,test,navigate])


    return (

		<div>
		<div className="test-content">
        <div className='test-form'>
		{currentQuestion === questions.length   &&  <div class="test-end">Thank you! Please visit your homepage to discover your new hobby! <button  type="submit" className="button submit-offer"><Link to='/user-home'className='link-home' >Discover</Link></button></div>
		  }
        
          <>
                <div className='question-section'>
		 {currentQuestion !== questions.length   &&     <div className='question-count'>
                        <span>Question {currentQuestion +1}</span>
                    </div>}
					
					{currentQuestion !== questions.length   &&   <div className='question-text'>{questions[currentQuestion].questionText}</div>
}
                </div>
                <div className='answer-section'>
				{currentQuestion !== questions.length   &&  questions[currentQuestion].answerOptions.map((answerOption) => (
							<button key={key++} className="test-button"  onClick={() => handleAnswerOptionClick(answerOption.category)}>{answerOption.answerText}</button>
						))}
                </div>
            </>
		
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
