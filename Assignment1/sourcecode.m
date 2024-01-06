HP = im2double(rgb2gray(imread('HP_silverstereo.png')));
LP = im2double(rgb2gray(imread('LP_building.png')));
imshow([HP LP]);
 
imwrite(HP,'HP.png');
imwrite(LP,'LP.png');

HP_freq = fftshift(abs(fft2(HP)));
LP_freq = fftshift(abs(fft2(LP)));
imshow([HP_freq LP_freq])

imshow([HP_freq LP_freq]/50);

HP_freq = HP_freq/50;
LP_freq = LP_freq/50;
imshow([HP_freq LP_freq]);


imwrite(HP_freq,'HP-freq.png');
imwrite(LP_freq,'LP-freq.png');

sobkern = [-1 0 1; -2 0 2; -1 0 1]


gauskern = fspecial('gaussian',41, 2.5);
surf(gauskern)
gauskern = fspecial('gaussian',15, 2.5);
surf(gauskern)
gauskern = fspecial('gaussian',13, 2.5);
surf(gauskern)
surf(gauskern)
saveas(gcf,'gaus-surf.png');
 
dogkern = conv2(gauskern, sobkern);
surf(dogkern);
saveas(gcf,'dog-surf.png');
 
HP_filt = imfilter(HP, gauskern);
imshow([HP HP_filt]);

imwrite(HP_filt,'HP-filt.png');
 
HP_filt_freq = fftshift(abs(fft2(HP_filt)));
imshow([HP_freq HP_filt_freq]);

imshow([HP_freq HP_filt_freq/50]);

HP_filt_freq = HP_filt_freq/50;
imwrite(HP_filt_freq,'HP-filt-freq.png');

LP_filt = imfilter(LP, gauskern);
imshow([LP LP_filt]);

imwrite(LP_filt,'LP-filt.png');
 
LP_filt_freq = fftshift(abs(fft2(LP_filt)));
imshow([LP_freq LP_filt_freq]);


imshow([LP_freq LP_filt_freq/50]);

LP_filt_freq = LP_filt_freq/50;
imwrite(LP_filt_freq,'LP-filt-freq.png');


dog_fou = fft2(dogkern, 500, 500);
filt_HP_fou = dog_fou .*(fft2(HP));
HP_dogfilt_freq = abs(fftshift(filt_HP_fou));
imshow(HP_dogfilt_freq);

imshow(HP_dogfilt_freq/50);

HP_dogfilt_freq = HP_dogfilt_freq/50;
imwrite(HP_dogfilt_freq,'HP-dogfilt-freq.png');

HP_dogfilt = ifft2(filt_HP_fou);
imshow([HP_dogfilt HP]);

HP_dogfilt = ifft2(HP_dogfilt_freq);
imshow([HP_dogfilt HP]);

imshow([HP_dogfilt*50 HP]);

HP_dogfilt = ifft2(filt_HP_fou);
imshow([HP_dogfilt HP]);

imwrite(HP_dogfilt,'HP-dogfilt.png');
 
filt_LP_fou = dog_fou .*(fft2(LP));
LP_dogfilt_freq = abs(fftshift(filt_LP_fou));
imshow(LP_dogfilt_freq);

imshow(LP_dogfilt_freq/50);

LP_dogfilt_freq = LP_dogfilt_freq/50;
imwrite(LP_dogfilt_freq,'LP-dogfilt-freq.png');

LP_dogfilt = ifft2(filt_LP_fou);
imshow([LP_dogfilt LP]);

imwrite(LP_dogfilt,'LP-dogfilt.png');
 
HP_sub2 = HP(1:2:end, 1:2:end);
LP_sub2 = LP(1:2:end, 1:2:end);
imshow([HP_sub2 LP_sub2]);

 
imwrite(HP_sub2,'HP-sub2.png');
imwrite(LP_sub2,'LP-sub2.png');
 
HP_sub2_freq = abs(fftshift(fft2(HP_sub2)));
 
imshow(HP_sub2_freq);

imshow(HP_sub2_freq/50);

HP_sub2_freq = abs(fftshift(fft2(HP_sub2, 500,500)));
imshow([HP_freq HP_sub2_freq]);

imshow([HP_freq HP_sub2_freq/50]);

HP_sub2_freq = HP_sub2_freq/50;
imwrite(HP_sub2_freq,'HP-sub2-freq.png');
 
LP_sub2_freq = abs(fftshift(fft2(LP_sub2, 500,500)));
imshow([HP_freq HP_sub2_freq]);

imshow([LP_freq LP_sub2_freq]);

LP_sub2_freq = LP_sub2_freq/50;
imshow([LP_freq LP_sub2_freq]);

imwrite(LP_sub2_freq,'LP-sub2-freq.png');
 
HP_sub4 = HP(1:4:end, 1:4:end);
LP_sub4 = LP(1:4:end, 1:4:end);
imshow([HP_sub4 LP_sub4]);

imwrite(HP_sub4,'HP-sub4.png');
imwrite(LP_sub4,'LP-sub4.png');

HP_sub4_freq = abs(fftshift(fft2(HP_sub4, 500,500)));
imshow([HP_freq HP_sub4_freq]);

HP_sub2_freq = HP_sub2_freq/50;
imshow([HP_freq HP_sub4_freq]);

HP_sub4_freq = HP_sub4_freq/50;
imshow([HP_freq HP_sub4_freq]);

imshow(HP_sub2_freq);

HP_sub2_freq = HP_sub2_freq*50;
imshow(HP_sub2_freq);
imshow(HP_sub2_freq);

imwrite(HP_sub4_freq,'HP-sub4-freq.png');

LP_sub4_freq = abs(fftshift(fft2(LP_sub4, 500,500)));
imshow([LP_freq LP_sub4_freq]);

LP_sub4_freq = LP_sub4_freq/50;
imshow([LP_freq LP_sub4_freq]);

imwrite(LP_sub4_freq,'LP-sub4-freq.png');
 
 
gauskern_sub2 = fspecial('gaussian',75, 10);
surf(gauskern_sub2);
gauskern_sub2 = fspecial('gaussian',55, 10);
surf(gauskern_sub2);

HP_filter_for_sub2 = imfilter(HP, gauskern_sub2);
HP_sub2_aa = HP_filter_for_sub2(1:2:end, 1:2:end);
imshow([HP_sub2_aa HP_sub2]);

gauskern_sub2 = fspecial('gaussian',10, 1.5);
surf(gauskern_sub2);
gauskern_sub2 = fspecial('gaussian',9, 1.5);
surf(gauskern_sub2);
HP_filter_for_sub2 = imfilter(HP, gauskern_sub2);
HP_sub2_aa = HP_filter_for_sub2(1:2:end, 1:2:end);
imshow([HP_sub2_aa HP_sub2]);

imwrite(HP_sub2_aa,'HP-sub2-aa.png');

HP_sub2_aa_freq = abs(fftshift(fft2(HP_sub2_aa, 500,500)));
imshow([HP_sub2_aa_freq HP_sub2_freq]);

HP_sub2_aa_freq = HP_sub2_aa_freq/50;
imshow([HP_sub2_aa_freq HP_sub2_freq]);

imwrite(HP_sub2_aa_freq,'HP-sub2-aa-freq.png');

gauskern_sub4 = fspecial('gaussian',15, 2.5);
surf(gauskern_sub4);
gauskern_sub4 = fspecial('gaussian',13, 2.5);
surf(gauskern_sub4);
gauskern_sub4 = fspecial('gaussian',13, 2);
surf(gauskern_sub4);
gauskern_sub4 = fspecial('gaussian',11, 2);
surf(gauskern_sub4);
HP_filter_for_sub2 = imfilter(HP, gauskern_sub2);
HP_filter_for_sub4 = imfilter(HP, gauskern_sub4);
HP_sub4_aa = HP_filter_for_sub4(1:4:end, 1:4:end);
imshow([HP_sub4_aa HP_sub4]);

gauskern_sub4 = fspecial('gaussian',7, 1);
surf(gauskern_sub4);
HP_filter_for_sub4 = imfilter(HP, gauskern_sub4);
HP_sub4_aa = HP_filter_for_sub4(1:4:end, 1:4:end);
imshow([HP_sub4_aa HP_sub4]);

gauskern_sub4 = fspecial('gaussian',11, 2);
surf(gauskern_sub4);
HP_filter_for_sub4 = imfilter(HP, gauskern_sub4);
HP_sub4_aa = HP_filter_for_sub4(1:4:end, 1:4:end);
imshow([HP_sub4_aa HP_sub4]);

imwrite(HP_sub4_aa,'HP-sub4-aa.png');

HP_sub4_aa_freq = abs(fftshift(fft2(HP_sub4_aa, 500,500)));
imshow([HP_sub4_aa_freq HP_sub4_freq]);

HP_sub4_aa_freq = HP_sub4_aa_freq/50;
imshow([HP_sub4_aa_freq HP_sub4_freq]);

imwrite(HP_sub4_aa_freq,'HP-sub4-aa-freq.png');
 
[cannyedge, thresh] = edge(HP, 'canny');
imshow(cannyedge);





imshow(edge(HP, 'canny', [0.07 0.1]));


imshow(edge(HP, 'canny', [0.02 0.15]));

imshow(edge(HP, 'canny', [0.08 0.15]));

imshow(edge(HP, 'canny', [0.08 0.11]));

imshow(edge(HP, 'canny', [0.06 0.10]));

imshow(edge(HP, 'canny', [0.06 0.14]));

imshow(edge(HP, 'canny', [0.04 0.1]));

imshow(edge(HP, 'canny', [0.05 0.1]));

HP_canny_optimal = edge(HP, 'canny', [0.05 0.1]);
HP_canny_lowlow = edge(HP, 'canny', [0.01 0.1250]);
imshow(HP_canny_lowlow);

imwrite(HP_canny_optimal, 'HP-canny-optimal.png');
imwrite(HP_canny_lowlow, 'HP-canny-lowlow.png');
HP_canny_highlow = edge(HP, 'canny', [0.1 0.1250]);
imshow(HP_canny_highlow);

imwrite(HP_canny_highlow, 'HP-canny-highlow.png');
HP_canny_lowhigh = edge(HP, 'canny', [0.0500 0.07]);
imshow(HP_canny_lowhigh);

imwrite(HP_canny_lowhigh, 'HP-canny-lowhigh.png');
HP_canny_highhigh = edge(HP, 'canny', [0.0500 0.2]);
imshow(HP_canny_highhigh);

imwrite(HP_canny_highhigh, 'HP-canny-highhigh.png');

[cannyedge, thresh] = edge(LP, 'canny');
imshow(cannyedge);


LP_canny_optimal = edge(LP, 'canny', [0.02 0.03]);
imshow(LP_canny_optimal);

LP_canny_optimal = edge(LP, 'canny', [0.01 0.02]);
imshow(LP_canny_optimal);

LP_canny_optimal = edge(LP, 'canny', [0.01 0.1]);
imshow(LP_canny_optimal);

imwrite(LP_canny_optimal, 'LP-canny-optimal.png');
LP_canny_lowlow = edge(LP, 'canny', [0.005 0.0469]);
imshow(LP_canny_lowlow);

imwrite(LP_canny_lowlow, 'LP-canny-lowlow.png');
LP_canny_highlow = edge(LP, 'canny', [0.03 0.0469]);
imshow(LP_canny_highlow);

imwrite(LP_canny_highlow, 'LP-canny-highlow.png');
LP_canny_lowhigh = edge(LP, 'canny', [0.0188 0.02]);
imshow(LP_canny_lowhigh);

imwrite(LP_canny_lowhigh, 'LP-canny-lowhigh.png');

LP_canny_highhigh = edge(LP, 'canny', [0.0188 0.1]);
imshow(LP_canny_lowhigh);

imshow(LP_canny_lowhigh);

imshow(LP_canny_highhigh);

imwrite(LP_canny_highhigh, 'LP-canny-highhigh.png');