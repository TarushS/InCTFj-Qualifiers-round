#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>


void main() {
	setvbuf(stdout, NULL, _IONBF, 0);
	setvbuf(stdin, NULL, _IONBF, 0);
	setvbuf(stderr, NULL, _IONBF, 0);
	char name[30];
	puts("Enter your name");
	scanf("%10s",name);

	puts("!!!Spent all your money to win!!!");
	int money = 0;
	int deposit;
	while (money >= 0){
		printf("The bank currently has a value of %d.\n",money);
		printf("Please enter the amount to deposit: ");

		if (scanf("%d",&deposit) != 1){
			printf("Error reading your value.\n");
		} else {
			if (deposit < 0){
				printf("You can't enter negatives!\n");
			} else {
				money += deposit;
			}
		}
	}
	gid_t gid = getegid();
	setresgid(gid,gid,gid);

	printf("The bank has a value of %d. You win!\n", money);
	FILE *fd;	
	char flag[50];
	fd = fopen("/home/ubuntu/flag.txt","r");
	if(fd==0) {
		printf("Error in opening file");
		exit(0);
	}
	
	fgets(flag,50,fd);
	puts(flag);

}

