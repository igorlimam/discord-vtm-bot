import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';
import { clans } from './vampire_data.js';
import { modal } from './custom_components/modal.js'

const generateClansArray = () => {
  let options = [];
  for(const clan of Object.keys(clans)){
    const name = clan;
    const value = clan.toLowerCase();
    options.push({"name": name, "value": value});
  };
  return options;
}

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};

const GENERATE_COMMAND = {
  name: 'generate',
  description: 'Suggests a character',
  options: [
    {
      type: 3,
      name: 'clan',
      required: true,
      description: 'select a clan to generate',
      choices: generateClansArray(),
    },
  ],
  type: 1,
};

const PING = {
  name:"ping",
  description: "Am I alive?"
}

const INFO_DISCIPLINE_COMMAND = {
  name: "discipline",
  description: "Oferece uma descrição de cada disciplina",
  options: [
    {
      type: 2, //subcommand
      name: "animalism",
      description: "Animalism description",
      options: [
        {
          name: "sense-the-beast",
          description: "Sense the Beast",
          type: 1 //command
        }
      ]
    }
  ]
}

const TEST_COMPONENT_COMMAND = modal;

const ALL_COMMANDS = [PING, TEST_COMMAND, CHALLENGE_COMMAND, GENERATE_COMMAND, INFO_DISCIPLINE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);