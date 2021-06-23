file1 = open('data.txt', 'r')
Lines = file1.readlines()

count = 0

# format: [
#     [teamname, wins, losses, ties, win %, streak, rounds won, rounds lost],
#     [teamname2, wins, losses, ties, win %, streak, rounds won, rounds lost],
# ]
array_of_each_team = []
total_array = []


# gets each team and its stats
# print(Lines[:10])
for index, line in enumerate(Lines):
    # id, team_name, wins, losses, ties, win_percent, streak, rounds_won, rounds_lost
    team_name, wins, losses, ties, win_percent, streak, rounds_won, rounds_lost = "", "", "", "", "", "", "", ""
    # start from back, and get each metric
    # print(line)
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

# now sort the data by wins --> rounds won
def sortTeamsByWin():
    total_array.sort(key=lambda x:x[2], reverse=True)

sortTeamsByWin()

# teams now sorted by wins
for line in total_array:
    print(line)

# arr = [[2, 3, 4, 8], [1, 2, 5, 6], [3, -5, 6, -2]]
# arr.sort(key=lambda x: x[3])
# print(arr)