#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

char FLAG[30]="inctf{fake_flag}";

int main() { 
	alarm(15);
	setvbuf(stdin,NULL,_IONBF,0);
	setvbuf(stdout,NULL,_IONBF,0);

	FILE *fd;
	fd = fopen("/home/format_me/flag.txt","r");
	if(fd==0) {
		printf("Error in opening file");
		exit(0);
	}
	fgets(FLAG,30,fd);

	char * flag = FLAG;
	char buffer[0x20];
	scanf("%31s",buffer);
	printf(buffer);
}

