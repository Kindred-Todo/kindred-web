import React from 'react'
import BentoHead from '../../components/typography/bentohead'
import BentoBody from '../../components/typography/bentobody'

import blueprint1 from '../../assets/bento/blueprint-1.png'
import blueprint2 from '../../assets/bento/blueprint-2.png'

import todoTop from '../../assets/bento/todo-top.png'
import todoBottom from '../../assets/bento/todo-bot.png'

import organization from '../../assets/bento/organization.png'

import post from '../../assets/bento/post.png'
import encourage from '../../assets/bento/encourage.png'

import activity from '../../assets/bento/tings.png'
import top from '../../assets/bento/top.png'
import profileStats from '../../assets/bento/profile-stats.png'

export default function Bento() {
  return (
    <div className="grid grid-cols-1 h-full md:h-screen md:grid-cols-5 md:grid-rows-3 w-full min-h-screen md:min-h-[110vh] gap-4 px-4 md:px-12">
      <div
        className="md:row-span-1 md:col-start-1 
        overflow-clip
      justify-center
      md:col-span-4 bg-light-foreground rounded-lg flex flex-col md:flex-row content-center"
      >
        <div className="flex flex-col gap-4 p-8 self-center">
          <BentoHead>Influencers & Blueprints</BentoHead>
          <BentoBody className="w-full md:w-4/5">
            Follow the same habits as others and subscribe to routines where
            tasks and habits are already laid out for you by credible people
          </BentoBody>
        </div>
        <div className="flex flex-col md:flex-row gap-4 py-4">
          <img src={blueprint1} alt="Blueprint 1" className="h-5/6 align-top" />
          <img
            src={blueprint2}
            alt="Blueprint 2"
            className="h-5/6 align-bottom flex-end self-end"
          />
        </div>
      </div>

      <div className="md:row-start-1 md:row-span-2 md:col-start-5 md:col-span-1 bg-light-foreground rounded-lg p-4 overflow-clip">
        <div className="flex flex-col gap-4 self-center content-center p-4 overflow-clip">
          <BentoHead>Structured Organization</BentoHead>
          <BentoBody className="w-full self-center">
            You can encourage your friend to complete tasks they've put publicly
            available daily and earn points
          </BentoBody>
        </div>
        <img
          src={organization}
          alt="Organization"
          className="w-full flex-end object-cover object-bottom"
        />
      </div>

      <div className="md:row-start-2 md:row-span-2 md:col-start-1 md:col-span-1 bg-light-foreground rounded-lg p-4 justify-around overflow-clip">
        <div className="flex flex-col gap-4 h-full justify-end content-center overflow-clip">
          <img src={top} alt="Profile Head" className="w-full" />
          <img
            src={activity}
            alt="Activity"
            className="w-full h-1/2 object-cover object-center"
          />
          <img src={profileStats} alt="Profile Stats" className="w-full" />
          <BentoHead>Activity & Profiles</BentoHead>
          <BentoBody className="w-full">
            Develop your profile with a comprehensive activity graph and metrics
            like tasks and streaks
          </BentoBody>
        </div>
      </div>

      <div className="md:row-start-2 md:row-span-1 md:col-start-2 md:col-span-3 bg-light-foreground rounded-lg p-4 overflow-clip">
        <div className="flex flex-col gap-4 self-center content-center">
          <img src={todoTop} alt="Todo" className="w-full self-center" />
          <BentoHead className="text-center">Powerful Todo List</BentoHead>
          <BentoBody className="text-center w-full md:w-3/4 self-center">
            We've taken a refreshing new take on a familiar system and
            implemented powerful organization and features
          </BentoBody>
          <img src={todoBottom} alt="Todo" className="w-full self-center" />
        </div>
      </div>

      <div className="md:row-start-3 md:row-span-1 md:col-start-2 md:col-span-2 bg-light-foreground rounded-lg p-8 overflow-clip">
        <div className="flex flex-col md:flex-row gap-4">
          <img src={post} alt="Post" className="w-full self-center" />
          <div className="flex flex-col h-full gap-4 self-center justify-center content-center">
            <BentoHead>Social Connections</BentoHead>
            <BentoBody className="w-full self-center">
              You can encourage your friend to complete tasks they've put
              publicly available daily and earn points
            </BentoBody>
          </div>
        </div>
      </div>

      <div className="md:row-start-3 md:row-span-1 md:col-start-4 md:col-span-2 bg-light-foreground rounded-lg p-8 overflow-clip">
        <div className="flex flex-col h-full md:flex-row gap-4">
          <div className="flex flex-col h-full w-4/5 gap-4 self-center justify-center content-center">
            <BentoHead>Encouragements</BentoHead>
            <BentoBody className="w-full self-center">
              You can encourage your friend to complete tasks they've put
              publicly available daily and earn points
            </BentoBody>
          </div>
          <img src={encourage} alt="Encourage" className="w-full self-center" />
        </div>
      </div>
    </div>
  )
}
