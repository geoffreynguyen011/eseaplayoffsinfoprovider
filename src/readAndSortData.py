# how to sort:
# first, sort all teams by wins
# then, for each team with equal number of wins, sort by losses
# for each of those teams, sort by rounds won
# then sort by rounds lost (although not entirely necessary, but good implementation)
# repeat for each

file1 = open('data.txt', 'r')
Lines = file1.readlines()

count = 0

# format: [
#     [id, teamname, wins, losses, ties, win %, streak, rounds won, rounds lost],
#     [id, teamname2, wins, losses, ties, win %, streak, rounds won, rounds lost],
#      ...
# ]
array_of_each_team = []
total_array = []

# gets each team and its stats
for index, line in enumerate(Lines):
    # id, team_name, wins, losses, ties, win_percent, streak, rounds_won, rounds_lost
    team_name, wins, losses, ties, win_percent, streak, rounds_won, rounds_lost = "", "", "", "", "", "", "", ""
    # start from back, and get each metric
    if line[0] == "/":
        continue
    i = len(line) - 2
    current_array = []
    while line[i] != " ":
        rounds_lost = line[i] + rounds_lost
        i -= 1
    current_array.insert(0, int(rounds_lost))
    i -= 1
    while line[i] != " ":
        rounds_won = line[i] + rounds_won
        i -= 1
    current_array.insert(0, int(rounds_won))

    i -= 1
    while line[i] != " ":
        streak = line[i] + streak
        i -= 1
    current_array.insert(0, streak)
    i -= 1
    while line[i] != " ":
        win_percent = line[i] + win_percent
        i -= 1
    current_array.insert(0, win_percent)
    i -= 1
    while line[i] != " ":
        ties = line[i] + ties
        i -= 1
    current_array.insert(0, int(ties))
    i -= 1
    while line[i] != " ":
        losses = line[i] + losses
        i -= 1
    current_array.insert(0, int(losses))
    i -= 1
    while line[i] != " ":
        wins = line[i] + wins
        i -= 1
    current_array.insert(0, int(wins))
    i -= 1
    while line[i] != "." and i > 1:
        team_name = line[i] + team_name
        i -= 1
    team_name = team_name[1:]
    current_array.insert(0, team_name)
    current_array.insert(0, index)
    
    # print(current_array)

    total_array.append(current_array)

    current_array = []
# print(total_array)

# all teams now in array with eight values in each array

# sort data by wins first
def sortTeamsByWin():
    total_array.sort(key=lambda x:x[2], reverse=True)

# sort data by losses next, passing in wins as parameter
def sortTeamsByLoss(wins):
    highest_index, lowest_index, losses_array, losses_lowest_index, losses_highest_index = 0, 0, [], 0, 1
    array_of_teams_with_equal_wins = []
    while total_array[lowest_index][2] != wins:
        lowest_index += 1
    while total_array[highest_index][2] >= wins:
        if (total_array[highest_index][2] == wins):
            array_of_teams_with_equal_wins.append(total_array[highest_index])
            if (total_array[highest_index][3] not in losses_array):
                losses_array.append(total_array[highest_index][3])
        highest_index += 1
    array_of_teams_with_equal_wins.sort(key=lambda x:x[3])
    for line, index in enumerate(total_array[lowest_index:highest_index]):
        total_array[line + lowest_index] = array_of_teams_with_equal_wins[line]
    # for line in array_of_teams_with_equal_wins:
    #     print(line)
    # testing below
    print(len(array_of_teams_with_equal_wins))
    # while losses_counter <= losses_array[len(losses_array) - 1]:
    while losses_highest_index < len(array_of_teams_with_equal_wins):
        # print(losses_highest_index)
        # print(array_of_teams_with_equal_wins[losses_highest_index][3], array_of_teams_with_equal_wins[losses_lowest_index][3])
        if array_of_teams_with_equal_wins[losses_highest_index][3] != array_of_teams_with_equal_wins[losses_lowest_index][3] or losses_highest_index == len(array_of_teams_with_equal_wins) - 1:
            sortTeamsByRoundsWon(array_of_teams_with_equal_wins[losses_lowest_index:losses_highest_index])
            losses_lowest_index = losses_highest_index
        losses_highest_index += 1
    # for line in array_of_teams_with_equal_wins:
    #     print(line)
    # print(total_array)
    # for line in total_array:
    #     print(line)

    
    
    

# sort data by rounds won next, passing in wins and losses as parameters

def sortTeamsByRoundsWon(array_of_teams_with_equal_losses):
    array_of_teams_with_equal_losses.sort(key=lambda x:x[7], reverse=True)
    test_array = []
    wins_lowest_index, wins_highest_index = 0, 1
    while wins_highest_index < len(array_of_teams_with_equal_losses):
        if array_of_teams_with_equal_losses[wins_lowest_index][7] != array_of_teams_with_equal_losses[wins_highest_index][7]:
            test_array.append(sortTeamsByRoundsLost(array_of_teams_with_equal_losses[wins_lowest_index:wins_highest_index]))
            wins_lowest_index = wins_highest_index
        wins_highest_index += 1
    for line in test_array:
        print(line)
        



def sortTeamsByRoundsLost(array_of_teams_with_equal_rounds_won):
    array_of_teams_with_equal_rounds_won.sort(key=lambda x:x[8])
    return array_of_teams_with_equal_rounds_won


sortTeamsByWin()
sortTeamsByLoss(10)
# for i in range(1, 15):
#     sortTeamsByLoss(i)
# teams now sorted by wins
# for line in total_array:
#     print(line)

# arr = [[2, 3, 4, 8], [1, 2, 5, 6], [3, -5, 6, -2]]
# arr.sort(key=lambda x: x[3])
# print(arr)
