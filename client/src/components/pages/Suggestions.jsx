import React, { useEffect, useState } from 'react';
import "../dashboard.scss";
import axios from "axios";
import { useFormAction, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'
import { Spinner } from "@chakra-ui/spinner"
import { RadialChart } from 'react-vis';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import { Wrap, WrapItem } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { NseIndia } from "stock-nse-india";
const nseIndia = new NseIndia()


const auth = getAuth();



const Suggestions = () => {


  const navigate = useNavigate();

  const [formData, setFormData] = useState(undefined);
  const [email, setEmail] = useState("");
  const [riskScore, setRiskScore] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);
  const [riskScoreLoading, setRiskScoreLoading] = useState(false);
  const [pieData, setPieData] = useState({});
  const [pieDataLoading, setPieDataLoading] = useState(true);
  const [pieChartData, setPieChartData] = useState([]);
  // alert
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  // alert

  // const myData = [{angle: 33}, {angle: 33}, {angle: 33}]

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        let tempEmail = user.email;
        setEmail(String(tempEmail));
        // const uid = user.uid;
        // ...

      } else {
        onOpen();

      }

    });


  }, []);

  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("https://nehaarane-fictional-meme-74jx6x66qjxfvqg-5000.preview.app.github.dev/news")
      .then((response) => { setNews(response.data.articles); console.log(response.data.articles) })
      .catch((err) => console.log(err))
  }, [])


  return (
    <div className="dashboard-container">

      {/* alert dialog box chakra */}
      {/* <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Login</AlertDialogHeader>
          <AlertDialogCloseButton onClick={() => navigate("/login")} />
          <AlertDialogBody>
            Login to get personalized data !
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme='green' ml={3} onClick={() => navigate("/login")}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      alert dialog box chakra */}

      <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
        <div className="row">
          <div className="col-md-auto">
            <div className="left-navigation" style={{ alignContent: "center", verticalAlign: "center" }}>
              <ol style={{ top: "15vh", position: "absolute" }}>
                <li>
                  <div className="" style={{ paddingBottom: "30px" }}>
                    <div className="row " style={{ marginTop: "3vh", paddingTop: "10px", paddingBottom: "10px" }}>
                      <div className="col-md-auto">
                        <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.3438 0H28.5938C29.3704 0 30 0.62959 30 1.40625V10.7813C30 11.5579 29.3704 12.1875 28.5938 12.1875H17.3438C16.5671 12.1875 15.9375 11.5579 15.9375 10.7813V1.40625C15.9375 0.62959 16.5671 0 17.3438 0ZM12.6562 0H1.40625C0.62959 0 0 0.62959 0 1.40625V10.7813C0 11.5579 0.62959 12.1875 1.40625 12.1875H12.6562C13.4329 12.1875 14.0625 11.5579 14.0625 10.7813V1.40625C14.0625 0.62959 13.4329 0 12.6562 0ZM0 15.4688V24.8438C0 25.6204 0.62959 26.25 1.40625 26.25H12.6562C13.4329 26.25 14.0625 25.6204 14.0625 24.8438V15.4688C14.0625 14.6921 13.4329 14.0625 12.6562 14.0625H1.40625C0.62959 14.0625 0 14.6921 0 15.4688ZM17.3438 26.25H28.5938C29.3704 26.25 30 25.6204 30 24.8438V15.4688C30 14.6921 29.3704 14.0625 28.5938 14.0625H17.3438C16.5671 14.0625 15.9375 14.6921 15.9375 15.4688V24.8438C15.9375 25.6204 16.5671 26.25 17.3438 26.25Z" fill="white" />
                        </svg>

                      </div>
                      <div className="col-md-auto">
                        <a href="/dashboard" style={{ color: "white", fontSize: "22px" }}>Dashboard</a>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "3vh", paddingTop: "10px", paddingBottom: "10px" }}>
                      <div className="col-md-auto">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 8.13838V6.976C0 6.01304 0.62959 5.23243 1.40625 5.23243H22.5V1.7453C22.5 0.193022 24.0175 -0.582501 24.9006 0.512385L29.5881 6.32427C30.1373 7.0052 30.1373 8.10917 29.5881 8.79003L24.9006 14.6019C24.0209 15.6925 22.5 14.9278 22.5 13.3691V9.88194H1.40625C0.62959 9.88194 0 9.10133 0 8.13838ZM28.5938 19.181H7.5V15.6938C7.5 14.1454 5.98465 13.3633 5.09936 14.4609L0.411855 20.2728C-0.137285 20.9537 -0.137285 22.0577 0.411855 22.7386L5.09936 28.5504C5.9799 29.6421 7.5 28.875 7.5 27.3176V23.8305H28.5938C29.3704 23.8305 30 23.0499 30 22.0869V20.9245C30 19.9616 29.3704 19.181 28.5938 19.181Z" fill="white" />
                        </svg>

                      </div>
                      <div className="col-md-auto">
                        <a href="/dashboard" style={{ color: "white", fontSize: "22px" }}>Recommendations</a>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "3vh", paddingTop: "10px", paddingBottom: "10px" }}>
                      <div className="col-md-auto">
                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.0265 5.84127V25.1587C29.0265 27.8471 26.8471 30.0265 24.1587 30.0265H5.84127C3.1529 30.0265 0.973545 27.8471 0.973545 25.1587V5.84127C0.973545 3.1529 3.1529 0.973545 5.84127 0.973545H9.05173H21.7241H24.1587C26.8471 0.973545 29.0265 3.1529 29.0265 5.84127Z" fill="white" stroke="white" stroke-width="1.94709" stroke-linecap="round" />
                          <path d="M5.55632 15.787H9.26356C9.3787 15.787 9.48794 15.736 9.56193 15.6478L12.7111 11.8931C12.8813 11.6901 13.2002 11.7127 13.3401 11.9376L17.7545 19.0333C17.8995 19.2664 18.2336 19.2803 18.3975 19.0601L20.7173 15.9439C20.7908 15.8452 20.9066 15.787 21.0297 15.787H23.8896" stroke="#2A2E30" stroke-width="1.94709" stroke-linecap="round" />
                        </svg>


                      </div>
                      <div className="col-md-auto">
                        <a href="/risk-appetite" style={{ color: "white", fontSize: "22px" }}>Risk Appetite</a>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "3vh", paddingTop: "10px", paddingBottom: "10px" }}>
                      <div className="col-md-auto">
                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.0265 5.84127V25.1587C29.0265 27.8471 26.8471 30.0265 24.1587 30.0265H18.3333H12.2222H5.84127C3.1529 30.0265 0.973545 27.8471 0.973545 25.1587V5.84127C0.973545 3.1529 3.1529 0.973545 5.84127 0.973545H9.05173H21.7241H24.1587C26.8471 0.973545 29.0265 3.1529 29.0265 5.84127Z" fill="white" stroke="white" stroke-width="1.94709" stroke-linecap="round" />
                          <path d="M6.66602 17.7964H11.8899M15.87 17.7964H23.3327M6.91477 22.389H15.87M23.3327 22.389H19.8501" stroke="#2A2E30" stroke-width="1.94709" stroke-linecap="round" />
                        </svg>
                      </div>
                      <div className="col-md-auto">
                        <a href="/form" style={{ color: "white", fontSize: "22px" }}>Questionnaire</a>
                      </div>
                    </div>
                    <div className="row selected" style={{ marginTop: "3vh", paddingTop: "10px", paddingBottom: "10px" }}>
                      <div className="col-md-auto">
                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24.0322 13.4207C24.0322 18.8393 19.4944 23.2786 13.8382 23.2786C8.18202 23.2786 3.64422 18.8393 3.64422 13.4207C3.64422 8.00213 8.18202 3.5628 13.8382 3.5628C19.4944 3.5628 24.0322 8.00213 24.0322 13.4207Z" fill="white" stroke="white" stroke-width="1.79235" />
                          <path d="M22.4668 23.6969L28.6237 30.1493" stroke="white" stroke-width="1.79235" stroke-linecap="round" />
                        </svg>

                      </div>
                      <div className="col-md-auto">
                        <a href="/suggestions" style={{ color: "white", fontSize: "22px" }}>Suggestions</a>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "3vh", paddingTop: "10px", paddingBottom: "10px" }}>
                      <div className="col-md-auto">
                        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.3534 7.20898H6.84127C3.61522 7.20898 1 9.82421 1 13.0503V26.1588C1 29.3848 3.61523 32.0001 6.84127 32.0001H26.1587C29.3848 32.0001 32 29.3848 32 26.1588V13.0503C32 9.82421 29.3848 7.20898 26.1587 7.20898H23.4483" stroke="white" stroke-width="1.94709" stroke-linecap="round" />
                          <path d="M17.0743 1.69983V16.3908M17.0743 1.69983L13.6299 4.68394M17.0743 1.69983L20.5188 4.68394" stroke="white" stroke-width="1.94709" stroke-linecap="round" />
                        </svg>
                      </div>
                      <div className="col-md-auto">
                        <a href="/logout" style={{ color: "white", fontSize: "22px" }}>Logout</a>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          <div className="col-md-auto" style={{ width: "54vw" }}>
            <h2 style={{ color: "white", marginBottom: "5vh", color: "white", position: "relative", top: "1.5vh", fontWeight: "bold", marginTop: "2vh" }}>Suggestions</h2>
            <div className="container">
              <div className="row">
                <div className="col-md-auto" style={{ overflowY: "scroll", height: "85vh", }}>
                  {
                    Object.keys(news).map((data, i) => {
                      return (
                        <>
                          {/* <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered
                            style={{height:"50vh",width:"50vw"}}
                          >
                            <AlertDialogOverlay />

                            <AlertDialogContent>
                              <AlertDialogHeader>{news[data].title}</AlertDialogHeader>
                              <AlertDialogCloseButton onClick={() => navigate("/login")} />
                              <AlertDialogBody>
                                Content:
                                 {news[data].content} <br/>
                                Description
                                  {news[data].description} <br/>
                              </AlertDialogBody>
                              <AlertDialogFooter>
                                <Button colorScheme='green' ml={3} onClick={onClose}>
                                  OK
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog> */}
                          <div className="container" style={{ background: "#2A2A2D", padding: "20px", borderRadius: "20px", marginBottom: "2vh" }}>
                            <a href={news[data].url} onClick={onOpen} className='news-title' style={{ color: "white" }}>{news[data].title}</a>
                            <div className="row">
                              <div className="col-md-6">
                                <p style={{ color: "#fdffde" }}>Source : {news[data].source.name}</p>
                              </div>
                              <div className="col-md-6">
                                <p style={{ color: "#fdffde" }}>Author : {news[data].author}</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })

                  }
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Suggestions