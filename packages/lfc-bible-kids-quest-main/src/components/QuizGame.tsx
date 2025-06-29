import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lightbulb, Trophy, Heart, Book } from 'lucide-react';
import BibleStoryModal from './BibleStoryModal';

interface Question {
  id: number;
  question: string;
  verse?: string;
  reference?: string;
  options: string[];
  correctAnswer: number;
  hint: {
    story: string;
    verse: string;
    reference: string;
  };
}

// Bible stories data
const bibleStories = {
  'John 14:27': {
    title: 'The Storm on the Sea',
    verses: ['John 14:27', '1 Peter 5:7', 'Matthew 6:25-27'],
    content: `Towering waves crashed over the disciples' boat as lightning split the dark sky. Terror filled their faces as water flooded the vessel. Yet Jesus slept peacefully in the stern, resting despite the chaos.

"We're going to die!" they shouted, finally waking Him.

Jesus stood and spoke three words: "Peace, be still." Instantly, the wind ceased and waves became glass-smooth.

"Why are you so afraid?" He asked gently. "Do you still have no faith?"

This is Christ's peace—not the absence of storms, but His presence in them. "My peace I give to you; not as the world gives."`
  },
  'Leviticus 19:17': {
    title: 'Nathan Confronts King David',
    verses: ['Leviticus 19:17', '1 John 3:16'],
    content: `Prophet Nathan walked through David's palace, heart heavy with God's message. The king had taken another man's wife and arranged his death, but no one dared speak truth to power.

Nathan told a story: a rich man with countless flocks stole and killed a poor man's only beloved lamb to feed a guest.

David's face flushed with anger. "That man deserves to die!"

"You are that man," Nathan replied steadily.

Nathan didn't hate David—he loved him too much to let him remain in sin. "Rebuke your neighbor frankly so you will not share in their guilt." Sometimes love means speaking hard truths.`
  },
  '1 Timothy 4:12': {
    title: 'Young Timothy Steps Forward',
    verses: ['1 Timothy 4:12', '2 Timothy 1:7'],
    content: `The Ephesian church buzzed with tension as young Timothy approached to speak. "He's too young," older members muttered skeptically.

Timothy's hands trembled as he unrolled the scroll, feeling their stares. But as he spoke about Christ's love, his voice grew stronger. He didn't try to sound older—he let genuine faith shine through.

One by one, skeptical faces softened. An elderly woman nodded approvingly. By the end, the atmosphere had completely changed.

"Let no one despise you for your youth," Paul had written. God gives not fear, but power, love, and sound mind. Age becomes irrelevant when authentic faith takes center stage.`
  },
  'Acts 20:35': {
    title: "The Widow's Offering",
    verses: ['Acts 20:35', '2 Corinthians 9:7'],
    content: `Wealthy donors made elaborate presentations at the temple treasury, their gold coins clanking loudly for all to hear. Then a bent widow quietly approached, dropping in two tiny copper coins—all she had.

No one noticed her whisper-soft offering except Jesus.

"This poor widow has put in more than all the others," He told His disciples. "They gave from wealth; she gave everything—all she had to live on."

"It is more blessed to give than to receive." The widow's sacrificial love proved that gift size matters less than sacrifice size.`
  },
  'Luke 9:34-36': {
    title: 'The Transfiguration',
    verses: ['Luke 9:34-36', 'Matthew 16:24-25'],
    content: `Peter, James, and John climbed the mountain with Jesus for prayer. Suddenly, His face shone like the sun and His clothes became dazzling white. Moses and Elijah appeared, discussing Jesus' approaching death in Jerusalem.

Peter blurted, "Let's build three shelters!" But a brilliant cloud enveloped them and God's voice thundered: "This is My Son; listen to Him!"

When the cloud lifted, only Jesus remained, looking ordinary again. The disciples had glimpsed the glory awaiting those who take up their cross and follow Him, even unto death.`
  }
};

const questions: Question[] = [
  {
    id: 1,
    question: "What does this verse teach us about the LORD's reign?",
    verse: "The LORD will be king over the whole earth. On that day there will be one LORD, and his name the only name.",
    reference: "Zechariah 14:9",
    options: [
      "The LORD will rule over a small kingdom",
      "There will be many lords ruling together",
      "The LORD will be king over the whole earth",
      "The LORD will share power with others"
    ],
    correctAnswer: 2,
    hint: {
      story: "This verse tells us that one day, everyone will know that God is the one true King over everything!",
      verse: "The LORD will be king over the whole earth. On that day there will be one LORD, and his name the only name.",
      reference: "Zechariah 14:9"
    }
  },
  {
    id: 2,
    question: "What drives out fear according to this verse?",
    verse: "There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love.",
    reference: "1 John 4:18",
    options: [
      "Perfect love drives out fear",
      "Courage drives out fear",
      "Knowledge drives out fear",
      "Prayer drives out fear"
    ],
    correctAnswer: 0,
    hint: {
      story: "God's perfect love for us takes away our fears because we know He cares for us completely!",
      verse: "There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love.",
      reference: "1 John 4:18"
    }
  },
  {
    id: 3,
    question: "According to this verse, what are we created to do?",
    verse: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    reference: "Ephesians 2:10",
    options: [
      "To become famous and wealthy",
      "To do good works that God prepared for us",
      "To compete with others",
      "To please ourselves"
    ],
    correctAnswer: 1,
    hint: {
      story: "God made each of us special with a unique purpose to do good things that He planned for us before we were even born!",
      verse: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
      reference: "Ephesians 2:10"
    }
  },
  {
    id: 4,
    question: "What will guard our hearts and minds?",
    verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    reference: "Philippians 4:6-7",
    options: [
      "Our own strength will guard us",
      "Money will guard our hearts",
      "The peace of God will guard our hearts and minds",
      "Friends will guard our hearts"
    ],
    correctAnswer: 2,
    hint: {
      story: "When we pray and give our worries to God, He gives us His amazing peace that protects our hearts and minds!",
      verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      reference: "Philippians 4:6-7"
    }
  },
  {
    id: 5,
    question: "How can people call on someone they haven't heard of?",
    verse: "How, then, can they call on the one they have not believed in? And how can they believe in the one of whom they have not heard? And how can they hear without someone preaching to them?",
    reference: "Romans 10:14",
    options: [
      "They can't call on someone they haven't heard of",
      "They can figure it out on their own",
      "They don't need to hear about God",
      "God will reveal Himself without anyone's help"
    ],
    correctAnswer: 0,
    hint: {
      story: "This verse shows us how important it is to tell others about Jesus - they need to hear about Him to believe!",
      verse: "How, then, can they call on the one they have not believed in? And how can they believe in the one of whom they have not heard? And how can they hear without someone preaching to them?",
      reference: "Romans 10:14"
    }
  },
  {
    id: 6,
    question: "How should we enter God's gates according to this psalm?",
    verse: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
    reference: "Psalms 100:4",
    options: [
      "With sadness and worry",
      "With thanksgiving and praise",
      "With fear and trembling",
      "With complaints and demands"
    ],
    correctAnswer: 1,
    hint: {
      story: "When we come to worship God, we should come with thankful hearts, praising Him for all His goodness!",
      verse: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
      reference: "Psalms 100:4"
    }
  },
  {
    id: 7,
    question: "What can separate us from God's love?",
    verse: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
    reference: "Romans 8:38-39",
    options: [
      "Many things can separate us from God's love",
      "Our mistakes can separate us from God's love",
      "Nothing can separate us from God's love",
      "Only really bad sins can separate us"
    ],
    correctAnswer: 2,
    hint: {
      story: "This amazing verse tells us that absolutely nothing - not even our worst mistakes - can separate us from God's love!",
      verse: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
      reference: "Romans 8:38-39"
    }
  },
  {
    id: 8,
    question: "How do iron and iron help each other?",
    verse: "As iron sharpens iron, so one person sharpens another.",
    reference: "Proverbs 27:17",
    options: [
      "Iron makes iron weaker",
      "Iron sharpens iron, so one person sharpens another",
      "Iron has no effect on iron",
      "Iron destroys other iron"
    ],
    correctAnswer: 1,
    hint: {
      story: "Just like iron tools make each other sharper when they rub together, good friends help us become better people!",
      verse: "As iron sharpens iron, so one person sharpens another.",
      reference: "Proverbs 27:17"
    }
  },
  {
    id: 9,
    question: "What will happen when the Spirit of the LORD comes powerfully upon someone?",
    verse: "The Spirit of the LORD will come powerfully upon you, and you will prophesy with them; and you will be changed into a different person.",
    reference: "1 Samuel 10:6-7",
    options: [
      "Nothing will change",
      "They will become very wealthy",
      "You will be changed into a different person",
      "They will become famous"
    ],
    correctAnswer: 2,
    hint: {
      story: "When God's Spirit comes into our lives, He changes us from the inside out, making us new people!",
      verse: "The Spirit of the LORD will come powerfully upon you, and you will prophesy with them; and you will be changed into a different person.",
      reference: "1 Samuel 10:6-7"
    }
  },
  {
    id: 10,
    question: "What are we if we belong to Christ?",
    verse: "So you are no longer a slave, but God's child; and since you are his child, God has made you also an heir.",
    reference: "Galatians 4:7",
    options: [
      "We are slaves to God",
      "We are God's children and heirs",
      "We are strangers to God",
      "We are servants only"
    ],
    correctAnswer: 1,
    hint: {
      story: "When we believe in Jesus, we become God's children and heirs - that means we get to inherit all His wonderful promises!",
      verse: "So you are no longer a slave, but God's child; and since you are his child, God has made you also an heir.",
      reference: "Galatians 4:7"
    }
  },
  {
    id: 11,
    question: "What does Paul pray will abound more and more?",
    verse: "And this is my prayer: that your love may abound more and more in knowledge and depth of insight, so that you may be able to discern what is best and may be pure and blameless for the day of Christ.",
    reference: "Philippians 1:9-10",
    options: [
      "That their wealth may abound",
      "That their love may abound more and more",
      "That their fame may abound",
      "That their power may abound"
    ],
    correctAnswer: 1,
    hint: {
      story: "Paul prayed that believers would grow in love, wisdom, and understanding so they could make good choices!",
      verse: "And this is my prayer: that your love may abound more and more in knowledge and depth of insight, so that you may be able to discern what is best and may be pure and blameless for the day of Christ.",
      reference: "Philippians 1:9-10"
    }
  },
  {
    id: 12,
    question: "What should we seek first?",
    verse: "But seek first his kingdom and his righteousness, and all these things will be given to you as well. Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
    reference: "Matthew 6:31-33",
    options: [
      "Seek first his kingdom and his righteousness",
      "Seek first wealth and success",
      "Seek first popularity and fame",
      "Seek first our own happiness"
    ],
    correctAnswer: 0,
    hint: {
      story: "Jesus teaches us that when we put God first in our lives, He will take care of everything else we need!",
      verse: "But seek first his kingdom and his righteousness, and all these things will be given to you as well. Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
      reference: "Matthew 6:31-33"
    }
  },
  {
    id: 13,
    question: "What should we not worry about?",
    verse: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
    reference: "Matthew 6:34",
    options: [
      "We should worry about everything",
      "Do not worry about tomorrow",
      "Only worry about big things",
      "Worry helps us prepare"
    ],
    correctAnswer: 1,
    hint: {
      story: "Jesus tells us not to worry about tomorrow because God will help us with each day as it comes!",
      verse: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
      reference: "Matthew 6:34"
    }
  },
  {
    id: 14,
    question: "When is God's power made perfect?",
    verse: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.",
    reference: "2 Corinthians 12:9",
    options: [
      "God's power is made perfect when we are strong",
      "God's power is made perfect in weakness",
      "God's power is made perfect when we are wealthy",
      "God's power is made perfect when we are popular"
    ],
    correctAnswer: 1,
    hint: {
      story: "God's strength shows up best when we admit we need His help - He loves to help us when we're weak!",
      verse: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.",
      reference: "2 Corinthians 12:9"
    }
  },
  {
    id: 15,
    question: "What will Jesus give to those who are weary and burdened?",
    verse: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.",
    reference: "Matthew 11:28-30",
    options: [
      "He will give them more work",
      "He will give them rest",
      "He will give them money",
      "He will give them fame"
    ],
    correctAnswer: 1,
    hint: {
      story: "When we're tired and overwhelmed, Jesus invites us to come to Him and He will give our hearts and souls rest!",
      verse: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.",
      reference: "Matthew 11:28-30"
    }
  },
  {
    id: 16,
    question: "What should we do instead of leaning on our own understanding?",
    verse: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    options: [
      "Trust in the LORD with all your heart",
      "Lean on our friends' understanding",
      "Trust only in ourselves",
      "Ask everyone for advice"
    ],
    correctAnswer: 0,
    hint: {
      story: "Instead of trying to figure everything out on our own, God wants us to trust Him completely because He knows what's best!",
      verse: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      reference: "Proverbs 3:5-6"
    }
  },
  {
    id: 17,
    question: "Why do we do good things as Christians?",
    options: [
      "To make up for our mistakes and earn God's love",
      "To show off how awesome we are to other people",
      "Because the Holy Spirit in us wants to do good",
      "To prove we're better than everyone else"
    ],
    correctAnswer: 2,
    hint: {
      story: "When we accept Jesus, the Holy Spirit comes to live in us and helps us want to do good things!",
      verse: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness and self-control.",
      reference: "Galatians 5:22-23"
    }
  },
  {
    id: 18,
    question: "What should we do when we make mistakes or sin?",
    options: [
      "Hide from God because we're too ashamed",
      "Try harder to be perfect on our own",
      "Humbly ask for God's forgiveness and love",
      "Give up because we'll never be good enough"
    ],
    correctAnswer: 2,
    hint: {
      story: "When we confess our sins to God, He always forgives us because He loves us so much!",
      verse: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
      reference: "1 John 1:9"
    }
  },
  {
    id: 19,
    question: "What does this verse teach about confronting sin?",
    verse: "Do not hate a fellow Israelite in your heart. Rebuke your neighbor frankly so you will not share in their guilt.",
    reference: "Leviticus 19:17",
    options: [
      "Ignore it and let God handle it",
      "Publicly shame the person",
      "Hate your brother in your heart",
      "Rebuke your neighbor frankly so you will not share in their guilt"
    ],
    correctAnswer: 3,
    hint: {
      story: "God wants us to lovingly help each other when we see someone doing wrong, not ignore it or be mean about it.",
      verse: "Do not hate a fellow Israelite in your heart. Rebuke your neighbor frankly so you will not share in their guilt.",
      reference: "Leviticus 19:17"
    }
  },
  {
    id: 20,
    question: "What kind of peace does Jesus give?",
    verse: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    reference: "John 14:27",
    options: [
      "Peace that is different from what the world gives",
      "Temporary peace that comes and goes",
      "Peace only for the disciples",
      "Peace through worldly success"
    ],
    correctAnswer: 0,
    hint: {
      story: "Jesus gives us a special peace that's different from anything the world can offer - it lasts forever!",
      verse: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      reference: "John 14:27"
    }
  },
  {
    id: 21,
    question: "What is the condition for answered prayer mentioned in this passage?",
    verse: "And I will do whatever you ask in my name, so that the Father may be glorified in the Son. You may ask me for anything in my name, and I will do it.",
    reference: "John 14:13-14",
    options: [
      "Praying loudly",
      "Asking in Jesus' name",
      "Fasting first",
      "Having multiple witnesses"
    ],
    correctAnswer: 1,
    hint: {
      story: "When we pray in Jesus' name, we're asking according to His will and character!",
      verse: "And I will do whatever you ask in my name, so that the Father may be glorified in the Son. You may ask me for anything in my name, and I will do it.",
      reference: "John 14:13-14"
    }
  },
  {
    id: 22,
    question: "How should young believers handle criticism about their age?",
    verse: "Don't let anyone look down on you because you are young, but set an example for the believers in speech, conduct, love, faith and purity.",
    reference: "1 Timothy 4:12",
    options: [
      "Avoid leadership roles until older",
      "Prove themselves through arguments",
      "Set an example in speech, conduct, love, faith, and purity",
      "Wait until they're 30 to minister"
    ],
    correctAnswer: 2,
    hint: {
      story: "Paul told Timothy that even though he was young, he could still be a great example to others!",
      verse: "Don't let anyone look down on you because you are young, but set an example for the believers in speech, conduct, love, faith and purity.",
      reference: "1 Timothy 4:12"
    }
  },
  {
    id: 23,
    question: "Why does God consider us precious?",
    verse: "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you, nations in exchange for your life.",
    reference: "Isaiah 43:4",
    options: [
      "Because of our good works",
      "Because we are wealthy",
      "Because we are perfect",
      "Because He loves us"
    ],
    correctAnswer: 3,
    hint: {
      story: "God loves us not because of what we do, but simply because we are His children!",
      verse: "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you, nations in exchange for your life.",
      reference: "Isaiah 43:4"
    }
  },
  {
    id: 24,
    question: "How are we justified before God?",
    verse: "This righteousness is given through faith in Jesus Christ to all who believe. There is no difference between Jew and Gentile, for all have sinned and fall short of the glory of God, and all are justified freely by his grace through the redemption that came by Christ Jesus.",
    reference: "Romans 3:22-24",
    options: [
      "Through keeping the law perfectly",
      "Through good deeds and charity",
      "Through faith in Jesus Christ, by grace as a gift",
      "Through church attendance"
    ],
    correctAnswer: 2,
    hint: {
      story: "We can't earn our way to heaven - it's a free gift from God through faith in Jesus!",
      verse: "This righteousness is given through faith in Jesus Christ to all who believe. There is no difference between Jew and Gentile, for all have sinned and fall short of the glory of God, and all are justified freely by his grace through the redemption that came by Christ Jesus.",
      reference: "Romans 3:22-24"
    }
  },
  {
    id: 25,
    question: "What did Jesus teach about greatness?",
    verse: "Whoever welcomes this little child in my name welcomes me; and whoever welcomes me welcomes the one who sent me. For it is the one who is least among you all who is the greatest.",
    reference: "Luke 9:46-48",
    options: [
      "The strongest person is greatest",
      "The smartest person is greatest",
      "The richest person is greatest",
      "Whoever is least among you is the greatest"
    ],
    correctAnswer: 3,
    hint: {
      story: "Jesus taught that being great means serving others, not being served by them!",
      verse: "Whoever welcomes this little child in my name welcomes me; and whoever welcomes me welcomes the one who sent me. For it is the one who is least among you all who is the greatest.",
      reference: "Luke 9:48"
    }
  },
  {
    id: 26,
    question: "What happened when the cloud enveloped them on the mountain?",
    verse: "A cloud appeared and covered them, and they were afraid as they entered the cloud. A voice came from the cloud, saying, 'This is my Son, whom I have chosen; listen to him.'",
    reference: "Luke 9:34-36",
    options: [
      "They were afraid and heard God's voice",
      "They fell asleep",
      "They started prophesying",
      "They began to glow"
    ],
    correctAnswer: 0,
    hint: {
      story: "On the mountain of transfiguration, God the Father spoke from the cloud about His beloved Son Jesus!",
      verse: "A cloud appeared and covered them, and they were afraid as they entered the cloud. A voice came from the cloud, saying, 'This is my Son, whom I have chosen; listen to him.'",
      reference: "Luke 9:34-35"
    }
  },
  {
    id: 27,
    question: "What must someone do to follow Jesus?",
    verse: "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me. For whoever wants to save their life will lose it, but whoever loses their life for me will save it.",
    reference: "Luke 9:23-24",
    options: [
      "Give away all their possessions",
      "Deny themselves, take up their cross daily",
      "Become a missionary",
      "Memorize the entire Bible"
    ],
    correctAnswer: 1,
    hint: {
      story: "Following Jesus means putting Him first in our lives every single day!",
      verse: "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me. For whoever wants to save their life will lose it, but whoever loses their life for me will save it.",
      reference: "Luke 9:23-24"
    }
  },
  {
    id: 28,
    question: "What does it profit a person to gain the whole world?",
    verse: "What good is it for someone to gain the whole world, and yet lose or forfeit their very self?",
    reference: "Luke 9:25",
    options: [
      "Great happiness and fulfillment",
      "Security for their family",
      "Nothing, if they lose their soul",
      "Influence to help others"
    ],
    correctAnswer: 2,
    hint: {
      story: "Jesus teaches us that our soul is more valuable than all the treasures in the world!",
      verse: "What good is it for someone to gain the whole world, and yet lose or forfeit their very self?",
      reference: "Luke 9:25"
    }
  },
  {
    id: 29,
    question: "What will happen to those who are ashamed of Jesus?",
    verse: "Whoever is ashamed of me and my words, the Son of Man will be ashamed of them when he comes in his glory and in the glory of the Father and of the holy angels.",
    reference: "Luke 9:26-27",
    options: [
      "They will be forgiven anyway",
      "They will get a second chance",
      "They will lose their salvation",
      "The Son of Man will be ashamed of them"
    ],
    correctAnswer: 3,
    hint: {
      story: "Jesus wants us to be proud to know Him and tell others about Him!",
      verse: "Whoever is ashamed of me and my words, the Son of Man will be ashamed of them when he comes in his glory and in the glory of the Father and of the holy angels.",
      reference: "Luke 9:26"
    }
  },
  {
    id: 30,
    question: "What did Jesus say about giving?",
    verse: "In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: 'It is more blessed to give than to receive.'",
    reference: "Acts 20:35",
    options: [
      "It is more blessed to give than to receive",
      "Give only to family members",
      "Give only when you have extra",
      "Giving is optional for believers"
    ],
    correctAnswer: 0,
    hint: {
      story: "Jesus taught that when we give to others, we receive joy and blessings from God!",
      verse: "In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: 'It is more blessed to give than to receive.'",
      reference: "Acts 20:35"
    }
  },
  {
    id: 31,
    question: "What is said about a virtuous woman's worth?",
    verse: "A wife of noble character who can find? She is worth far more than rubies.",
    reference: "Proverbs 31:10-31",
    options: [
      "She is worth her weight in gold",
      "Her worth is far above rubies",
      "She is priceless beyond measure",
      "Her value increases with age"
    ],
    correctAnswer: 1,
    hint: {
      story: "God values women who love Him and live with wisdom and kindness!",
      verse: "A wife of noble character who can find? She is worth far more than rubies.",
      reference: "Proverbs 31:10"
    }
  },
  {
    id: 32,
    question: "What are the three main spiritual disciplines Jesus discusses in Matthew 6?",
    verse: "Be careful not to practice your righteousness in front of others to be seen by them. If you do, you will have no reward from your Father in heaven.",
    reference: "Matthew 6:1",
    options: [
      "Prayer, fasting, and Bible study",
      "Worship, service, and evangelism",
      "Giving, prayer, and fasting",
      "Love, joy, and peace"
    ],
    correctAnswer: 2,
    hint: {
      story: "Jesus taught about three important ways to grow closer to God: giving to help others, praying to talk with God, and fasting to focus on Him!",
      verse: "Be careful not to practice your righteousness in front of others to be seen by them. If you do, you will have no reward from your Father in heaven.",
      reference: "Matthew 6:1"
    }
  },
  {
    id: 33,
    question: "What was God's motivation for sending His Son?",
    verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    options: [
      "To judge the world",
      "To establish a kingdom",
      "To fulfill prophecy",
      "Because He loved the world"
    ],
    correctAnswer: 3,
    hint: {
      story: "This is one of the most famous verses in the Bible - it tells us that God sent Jesus because He loves us so much!",
      verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      reference: "John 3:16"
    }
  },
  {
    id: 34,
    question: "How do we know what love is?",
    verse: "This is how we know what love is: Jesus Christ laid down his life for us. And we ought to lay down our lives for our brothers and sisters.",
    reference: "1 John 3:16",
    options: [
      "Through our feelings and emotions",
      "Jesus laid down His life for us",
      "Through human relationships",
      "By reading about it in books"
    ],
    correctAnswer: 1,
    hint: {
      story: "The greatest example of love is Jesus dying on the cross for us!",
      verse: "This is how we know what love is: Jesus Christ laid down his life for us. And we ought to lay down our lives for our brothers and sisters.",
      reference: "1 John 3:16"
    }
  },
  {
    id: 35,
    question: "For whom do all things work together for good?",
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    options: [
      "Everyone in the world",
      "Only pastors and missionaries",
      "Those who love God and are called according to His purpose",
      "People who pray every day"
    ],
    correctAnswer: 2,
    hint: {
      story: "God promises that even when bad things happen, He can use them for good in the lives of those who love Him!",
      verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      reference: "Romans 8:28"
    }
  },
  {
    id: 36,
    question: "Through whom can we do all things?",
    verse: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
    options: [
      "Through positive thinking",
      "Through hard work and determination",
      "Through the support of others",
      "Through Christ who strengthens us"
    ],
    correctAnswer: 3,
    hint: {
      story: "Paul learned that with Jesus' help, he could handle anything that came his way!",
      verse: "I can do all this through him who gives me strength.",
      reference: "Philippians 4:13"
    }
  },
  {
    id: 37,
    question: "What should we do with our anxieties?",
    verse: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7",
    options: [
      "Keep them to ourselves",
      "Cast them on God because He cares for us",
      "Share them with everyone",
      "Ignore them completely"
    ],
    correctAnswer: 1,
    hint: {
      story: "When we're worried or scared, we can give all our fears to God because He loves us and wants to help!",
      verse: "Cast all your anxiety on him because he cares for you.",
      reference: "1 Peter 5:7"
    }
  },
  {
    id: 38,
    question: "What has God not given us?",
    verse: "For God has not given us a spirit of fear, but of power, love and of sound mind.",
    reference: "2 Timothy 1:7",
    options: [
      "A spirit of fear",
      "Power and love",
      "Sound mind",
      "His presence"
    ],
    correctAnswer: 0,
    hint: {
      story: "God doesn't want us to be afraid - He gives us power, love, and a clear mind instead!",
      verse: "For God has not given us a spirit of fear, but of power, love and of sound mind.",
      reference: "2 Timothy 1:7"
    }
  },
  {
    id: 39,
    question: "Why do some prayers go unanswered?",
    verse: "When you ask, you do not receive, because you ask with wrong motives, that you may spend what you get on your pleasures.",
    reference: "James 4:3",
    options: [
      "God is too busy",
      "We don't pray long enough",
      "We ask with wrong motives",
      "We don't have enough faith"
    ],
    correctAnswer: 2,
    hint: {
      story: "God always hears our prayers, but sometimes we ask for things for selfish reasons instead of what's best!",
      verse: "When you ask, you do not receive, because you ask with wrong motives, that you may spend what you get on your pleasures.",
      reference: "James 4:3"
    }
  },
  {
    id: 40,
    question: "What does Jesus say He will do if anyone opens the door?",
    verse: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.",
    reference: "Revelation 3:20",
    options: [
      "Give them riches",
      "Come in and eat with them",
      "Grant them three wishes",
      "Make them famous"
    ],
    correctAnswer: 1,
    hint: {
      story: "Jesus wants to have a close, personal relationship with each of us - like friends eating together!",
      verse: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.",
      reference: "Revelation 3:20"
    }
  }
].sort(() => Math.random() - 0.5);

const QuizGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
      setShowStory(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
    setShowStory(false);
    setScore(0);
    setGameComplete(false);
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;
  
  // Get the story for the current question
  const getCurrentStory = () => {
    if (!currentQ.reference) return null;
    return bibleStories[currentQ.reference as keyof typeof bibleStories] || null;
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl scroll-border">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-biblical-gold rounded-full w-16 h-16 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="bubble-text text-4xl text-biblical-dark-brown mb-2">
              Great Job! 🎉
            </CardTitle>
            <p className="text-xl text-wood-700">
              You scored {score} out of {questions.length}!
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="p-6 bg-biblical-cream rounded-lg">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-lg text-biblical-dark-brown font-semibold">
                "Jesus loves you and wants to help you grow closer to Him every day!"
              </p>
              <p className="text-sm text-wood-600 mt-2 italic">
                - Remember: Living for Christ is a journey of love and growth
              </p>
            </div>
            <Button 
              onClick={resetGame}
              className="biblical-button text-lg px-8 py-3 rounded-full"
            >
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl scroll-border">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-biblical-gold text-white">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 border-biblical-gold text-biblical-dark-gold">
              Score: {score}
            </Badge>
          </div>
          <CardTitle className="bubble-text text-2xl md:text-3xl text-biblical-dark-brown leading-relaxed">
            {currentQ.question}
          </CardTitle>
          
          {/* Display verse if it exists */}
          {currentQ.verse && (
            <div className="mt-4 p-4 bg-biblical-cream rounded-lg border-l-4 border-biblical-gold">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-biblical-sage mt-1 flex-shrink-0" />
                <div>
                  <p className="text-biblical-dark-brown italic mb-2">"{currentQ.verse}"</p>
                  <p className="text-sm text-wood-600 font-semibold">- {currentQ.reference}</p>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
              
              if (showResult) {
                if (index === currentQ.correctAnswer) {
                  buttonClass += "bg-green-100 border-green-500 text-green-800";
                } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                  buttonClass += "bg-red-100 border-red-500 text-red-800";
                } else {
                  buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                }
              } else if (selectedAnswer === index) {
                buttonClass += "bg-biblical-gold border-4 border-biblical-gold text-biblical-dark-brown transform scale-105 shadow-lg";
              } else {
                buttonClass += "bg-white border-wood-300 text-biblical-dark-brown hover:bg-wood-50 hover:border-wood-400";
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)})
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {showHint && (
            <div className="bg-biblical-cream p-4 rounded-lg border-l-4 border-biblical-sage animate-fade-in">
              <div className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 text-biblical-sage mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-biblical-dark-brown mb-2">Bible Hint:</h4>
                  <p className="text-biblical-dark-brown mb-3">{currentQ.hint.story}</p>
                  <div className="bg-white p-3 rounded border-l-4 border-biblical-gold">
                    <p className="text-sm text-wood-700 italic mb-1">"{currentQ.hint.verse}"</p>
                    <p className="text-xs text-wood-600 font-semibold">- {currentQ.hint.reference}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showResult && (
            <div className={`p-4 rounded-lg text-center animate-scale-in ${
              isCorrect 
                ? 'bg-green-100 border border-green-300' 
                : 'bg-orange-100 border border-orange-300'
            }`}>
              <p className={`text-lg font-bold mb-2 ${
                isCorrect ? 'text-green-700' : 'text-orange-700'
              }`}>
                {isCorrect ? '🎉 Correct! Great job!' : '💭 Not quite right, but keep learning!'}
              </p>
              <p className="text-sm text-gray-600">
                {isCorrect 
                  ? 'You\'re growing in wisdom!' 
                  : 'Remember, God loves you as you learn and grow!'}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="flex items-center gap-2 border-biblical-sage text-biblical-sage hover:bg-biblical-sage hover:text-white"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? 'Hide Hint' : 'Need a Hint?'}
              </Button>
              
              {getCurrentStory() && (
                <Button 
                  onClick={() => setShowStory(true)}
                  variant="outline"
                  className="flex items-center gap-2 border-biblical-gold text-biblical-gold hover:bg-biblical-gold hover:text-white"
                >
                  <Book className="w-4 h-4" />
                  Bible Story
                </Button>
              )}
            </div>
            
            <div className="flex gap-3">
              {!showResult ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="biblical-button px-6 py-2"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="biblical-button px-6 py-2"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Game'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <BibleStoryModal
        isOpen={showStory}
        onClose={() => setShowStory(false)}
        story={getCurrentStory()}
      />
    </div>
  );
};

export default QuizGame;
